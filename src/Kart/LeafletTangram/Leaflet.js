import L from "leaflet";
// -- WEBPACK: Load styles --
import "leaflet/dist/leaflet.css";
import React from "react";
import Tangram from "tangram";
import { createScene, updateScene } from "./scene";
import backend from "Funksjoner/backend";
import { Landscape } from "@material-ui/icons";
import språk from "Funksjoner/språk";
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

function roundToX(num, x) {
  return +(Math.round(num + "e+" + x) + "e-" + x);
}

function updateMarkerPosition(clickCoordinates, parent) {
  let offset = parent.marker._mapToAdd._mapPane._leaflet_pos;

  parent.setState({
    clickCoordinates: clickCoordinates, // origin
    windowXpos: clickCoordinates.x + offset.x,
    windowYpos: clickCoordinates.y - 56 + offset.y
  });
}

class LeafletTangram extends React.Component {
  state = {
    windowXpos: 0,
    windowYpos: 0,
    showPopup: false,
    buttonUrl: null,
    sted: null,
    data: null,
    koordinat: null,
    clickCoordinates: { x: 0, y: 0 }
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
        updateMarkerPosition(this.state.clickCoordinates, this);
      }
    });
    map.on("zoomend", e => {
      if (e.hard) {
        // moved by bounds
      } else {
        // moved by drag/keyboard
        this.props.onMapBoundsChange(map.getBounds());
        if (this.marker) {
          updateMarkerPosition(this.marker._icon._leaflet_pos, this);
        }
      }
    });
    map.on("resize", e => {
      if (e.hard) {
        // moved by bounds
      } else {
        // moved by drag/keyboard
        this.props.onMapBoundsChange(map.getBounds());
        if (this.marker) {
          updateMarkerPosition(this.marker._icon._leaflet_pos, this);
        }
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
    this.setState({
      sted: null,
      data: null
    });
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
        showPopup: true,
        koordinat: [latlng.lng, latlng.lat]
      });
      backend.hentStedsnavn(latlng.lng, latlng.lat).then(sted => {
        this.setState({ sted: sted.placename });
      });
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
            <button
              className="invisible_icon_button"
              onClick={e => {
                this.setState({
                  showPopup: !this.state.showPopup
                });
              }}
            >
              x
            </button>
            {this.state.koordinat && (
              <>
                lat: {roundToX(this.state.koordinat[0], 5)}, lng:{" "}
                {roundToX(this.state.koordinat[1], 5)}
                <br />
              </>
            )}

            {this.state.sted && (
              <>
                {this.state.sted} <br />
              </>
            )}

            {this.state.data ? (
              <>
                {this.state.data.kommune && (
                  <b>{språk(this.state.data.kommune.tittel)}</b>
                )}
                {this.state.data.kommune && this.state.data.fylke && (
                  <b>{", "} </b>
                )}
                {this.state.data.fylke && (
                  <b>
                    {språk(this.state.data.fylke.tittel)} <br />
                  </b>
                )}
                {this.state.data.landskap && (
                  <>
                    <Landscape /> {språk(this.state.data.landskap.tittel)}{" "}
                    <br />
                  </>
                )}
              </>
            ) : (
              "Ingen data funnet"
            )}

            <button
              className="link_to_page"
              onClick={e => {
                this.props.history.push(this.state.buttonUrl);
              }}
            >
              Les mer på stedets informasjonsside
            </button>
            <br />
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
