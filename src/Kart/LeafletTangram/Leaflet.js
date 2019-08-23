import L from "leaflet";
// -- WEBPACK: Load styles --
import "leaflet/dist/leaflet.css";
import React from "react";
import Tangram from "tangram";
import { createScene, updateScene } from "./scene";
import backend from "Funksjoner/backend";
import "style/Kart.css";
// -- LEAFLET: Fix Leaflet's icon paths for Webpack --
// See here: https://github.com/PaulLeCam/react-leaflet/issues/255
// Used in conjunction with url-loader.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

function updateMarkerPosition(clickCoordinates, parent) {
  /* her må dt regnes ut en offset for zoom + startkoordinat */
  //parent.state.last_center.lat // parent.state.zoom;
  //clickCoordinates.x - parent.state.last_center.lat;
  parent.setState({
    clickCoordinates: clickCoordinates, // origin
    windowXpos: clickCoordinates.x + parent.state.panOffsetx,
    windowYpos: clickCoordinates.y - 56 + parent.state.panOffsety
  });
}

class LeafletTangram extends React.Component {
  state = {
    windowXpos: 764,
    windowYpos: 386,
    panOffsetx: 0,
    panOffsety: 0,
    last_center: 0,
    zoom: this.props.zoom * 1.8,
    showPopup: false,
    buttonUrl: null,
    data: null
  };

  componentDidMount() {
    const options = {
      zoomControl: false,
      inertia: true,
      minZoom: 3
    };

    let map = L.map(this.mapEl, options);

    map.on("drag", e => {
      //console.log(e.latlng);
      if (e.hard) {
        // moved by bounds
      } else {
        // moved by drag/keyboard
        this.props.onMapBoundsChange(map.getBounds());

        let lastpos = e.target.dragging._lastPos;
        this.setState({
          panOffsetx: lastpos.x,
          panOffsety: lastpos.y
        });
        updateMarkerPosition(this.state.clickCoordinates, this);
      }
    });
    map.on("zoomend", e => {
      if (e.hard) {
        // moved by bounds
      } else {
        // moved by drag/keyboard
        this.props.onMapBoundsChange(map.getBounds());
        let last_center = e.target._lastCenter;
        let zoom = e.target._zoom;
        console.log("zoom.", zoom, last_center);
        this.setState({
          last_center: last_center,
          zoom: e.target._zoom
        });
      }
    });
    map.setView(
      [this.props.latitude, this.props.longitude],
      this.props.zoom * 1.8
    );

    L.control.zoom({ position: "topright" }).addTo(map);
    L.DomUtil.addClass(map._container, "crosshair-cursor-enabled");
    this.map = map;
    let def = {
      scene: createScene(this.props),
      events: {
        hover: function(selection) {
          // console.log('Hover!', selection)
        },
        click: this.handleClick,
        drag: this.handleDrag
      },
      attribution: '<a href="https://artsdatabanken.no">Artsdatabanken</a>'
    };

    this.layer = Tangram.leafletLayer(def);
    this.map.addLayer(this.layer);
    // this.layer.loadScene(this.layer.scene)
    this.icon = L.icon({
      iconUrl: "/marker/baseline_place_black_18dp.png",
      iconSize: [36, 36],
      iconAnchor: [17, 35]
    });
  }

  erEndret(prevProps) {
    if (this.props.aktiveLag !== prevProps.aktiveLag) return true;
    if (this.props.meta !== prevProps.meta) return true;
    if (this.props.opplystKode !== prevProps.opplystKode) return true;
    if (this.props.show_current !== prevProps.show_current) return true;
  }

  componentDidUpdate(prevProps) {
    if (this.props.bounds !== prevProps.bounds) {
      const bounds = this.props.bounds;
      if (bounds) {
        this.map.flyToBounds(bounds);
      }
    }

    if (this.erEndret(prevProps)) {
      this.updateMap(this.props);
      return;
    }
  }

  removeMarker() {
    if (!this.marker) return;
    this.map.removeLayer(this.marker);
  }

  handleClick = e => {
    const latlng = e.leaflet_event.latlng;
    //console.log(e.leaflet_event)
    this.removeMarker();
    this.marker = L.marker([latlng.lat, latlng.lng], { icon: this.icon }).addTo(
      this.map
    );

    backend.hentPunkt(latlng.lng, latlng.lat).then(data => {
      if (!data) {
        return null;
      }
      let url = "";
      if (data.fylke || data.kommune) {
        url =
          "/" + data.kommune.url + "?lng=" + latlng.lng + "&lat=" + latlng.lat;
      } else {
        url = "/Natur_i_Norge/?lng=" + latlng.lng + "&lat=" + latlng.lat;
      }
      url = url.replace(/ /g, "_");
      updateMarkerPosition(e.leaflet_event.layerPoint, this);
      this.setState({
        buttonUrl: url,
        data: data,
        showPopup: true
      });
      //console.log(this.state);
    });
  };

  updateMap(props) {
    updateScene(this.layer.scene.config, props);
    this.layer.scene.updateConfig({ rebuild: true });
  }

  render() {
    return (
      <>
        {this.state.showPopup && (
          <div
            className="popup"
            style={{
              transform:
                "translate3d(" +
                this.state.windowXpos +
                "px, " +
                this.state.windowYpos +
                "px, 0px)"
            }}
          >
            <b>
              {this.state.data.kommune && this.state.data.kommune.tittel.nb}
            </b>
            <br />
            <b>{this.state.data.fylke && this.state.data.fylke.tittel.nb}</b>
            <br />
            <b>{this.state.windowXpos && this.state.windowXpos}</b>
            <br />
            <b>{this.state.windowYpos && this.state.windowYpos}</b>
            <br />
            <button
              className="frontpage_header"
              onClick={e => {
                this.props.history.push(this.state.buttonUrl);
              }}
            >
              URL
            </button>
            <br />

            <button
              className="frontpage_header"
              onClick={e => {
                this.setState({
                  showPopup: !this.state.showPopup
                });
              }}
            >
              x
            </button>
          </div>
        )}

        <div
          style={{ zIndex: -100, cursor: "default" }}
          ref={ref => {
            this.mapEl = ref;
          }}
        />
      </>
    );
  }
}

export default LeafletTangram;
