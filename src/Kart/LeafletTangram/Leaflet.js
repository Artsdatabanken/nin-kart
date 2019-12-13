import L from "leaflet";
// -- WEBPACK: Load styles --
import "./leaflet.scss";
import "leaflet/dist/leaflet.css";
import React from "react";
import Tangram from "tangram";
import { createScene, updateScene } from "./scene/scene";
import PopUp from "./LeafletComponents/PopUp";
import {
  Fullscreen,
  FullscreenExit,
  LocationSearching
} from "@material-ui/icons";
import updateMarkerPosition from "./LeafletActions/updateMarkerPosition";
// -- LEAFLET: Fix Leaflet's icon paths for Webpack --
// See here: https://github.com/PaulLeCam/react-leaflet/issues/255
// Used in conjunction with url-loader.

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

let header_shift = 56;

function find_searchparams(searchparams) {
  let coord = null;
  for (let i in searchparams) {
    if (searchparams[i].includes("lng")) {
      coord = searchparams[i].split("&");
      coord[0] = coord[0].split("=")[1];
      coord[1] = coord[1].split("=")[1];
    }
  }
  return coord;
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

    /*    if (this.props.forvaltningsportal === "true") {
      header_shift = 113;
    }
*/
    let map = L.map(this.mapEl, options);

    map.on("drag", e => {
      if (!e.hard) {
        this.props.onMapBoundsChange(map.getBounds());
      }
      if (this.marker) {
        updateMarkerPosition(this.state.clickCoordinates, this, header_shift);
      }
    });
    map.on("zoomend", e => {
      if (!e.hard) {
        this.props.onMapBoundsChange(map.getBounds());
      }
      if (this.marker) {
        updateMarkerPosition(
          this.marker._icon._leaflet_pos,
          this,
          header_shift
        );
      }
    });
    map.on("resize", e => {
      if (!e.hard) {
        this.props.onMapBoundsChange(map.getBounds());
      }
      if (this.marker) {
        updateMarkerPosition(
          this.marker._icon._leaflet_pos,
          this,
          header_shift
        );
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
        hover: function(selection) {},
        click: this.handleClick,
        drag: this.handleDrag
      },
      attribution: '<a href="https://artsdatabanken.no">Artsdatabanken</a>'
    };

    this.layer = Tangram.leafletLayer(def);
    this.map.addLayer(this.layer);
    // this.layer.loadScene(this.layer.scene)
    this.icon = L.icon({
      iconUrl: "/marker/pdoc.png",
      iconSize: [38, 51],
      iconAnchor: [19, 41]
    });

    let coord = find_searchparams((this.props.path || "").split("?"));

    map.on("locationfound", e => this.onLocationFound(e));
    map.on("locationerror", e => this.onLocationError(e));

    if (coord) {
      this.marker = L.marker([coord[1], coord[0]], { icon: this.icon })
        .addTo(this.map)
        .on("click", e => {
          if (this.map) {
            console.warn("legg inn funksjon her senere.");
          }
        });
      this.getBackendData(coord[0], coord[1], this.marker._icon._leaflet_pos);
    }
  }

  onLocationFound(e) {
    var radius = e.accuracy / 2;
    radius = L.circle(e.latlng, radius).addTo(this.map);
    var gpsmarker = L.marker(e.latlng)
      .addTo(this.map)
      .on("click", e => {
        if (this.map) {
          this.map.removeLayer(gpsmarker);
          this.map.removeLayer(radius);
        }
      });
  }
  onLocationError(e) {
    alert(e.message);
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

  getBackendData = async (lng, lat, e) => {
    updateMarkerPosition(e, this, header_shift);
    this.props.handleLokalitetUpdate(lng, lat);
  };

  handleClick = e => {
    const latlng = e.leaflet_event.latlng;
    this.removeMarker();
    this.marker = L.marker([latlng.lat, latlng.lng], { icon: this.icon }).addTo(
      this.map
    );
    this.getBackendData(latlng.lng, latlng.lat, e.leaflet_event.layerPoint);
    let urlparams = (this.props.path || "").split("?");
    let newurlstring = "";
    for (let i in urlparams) {
      if (!urlparams[i].includes("lng") && urlparams[i] !== "") {
        newurlstring += "?" + urlparams[i];
      }
    }
    this.props.history.push(
      "?lng=" + latlng.lng + "&lat=" + latlng.lat + newurlstring
    );
  };

  updateMap(props) {
    if (!this.layer.scene.config) return; // not yet loaded
    updateScene(this.layer.scene.config, props);
    this.layer.scene.updateConfig({ rebuild: true });
    this.syncWmsLayers(props.aktiveLag);
  }

  syncWmsLayers(aktive) {
    Object.keys(aktive).forEach(akey => {
      const al = aktive[akey];
      const layerName = "wms_" + akey;
      const prev = this.wms[layerName];
      if (!al.kart || !al.kart.format.wms) return;
      const wms = al.kart.format.wms;
      if (al.kart.format.wms && al.erSynlig === true) {
        if (!prev) {
          const url = wms.url.toLowerCase().replace("?version=1.1.1", "");
          console.log(url);
          var wmsLayer = L.tileLayer.wms(url, {
            layers: wms.layer,
            transparent: true,
            format: "image/png",
            opacity: al.opacity
          });
          this.wms[layerName] = wmsLayer;
          this.map.addLayer(wmsLayer);
          wmsLayer.setOpacity(al.opacity);
        } else prev.setOpacity(al.opacity);
      } else {
        if (prev) {
          this.map.removeLayer(prev);
          delete this.wms[layerName];
        }
      }
    });
  }

  wms = {};

  render() {
    return (
      <>
        {this.state.showPopup && <PopUp parent={this} path={this.props.path} />}

        {this.props.aktivTab === "kartlag" && (
          <button
            className="fullscreen map_button"
            title="Fullskjermsvisning"
            alt="Fullskjermsvisning"
            onClick={e => {
              this.props.handleFullscreen(!this.props.showFullscreen);
            }}
          >
            {this.props.showFullscreen === true ? (
              <FullscreenExit />
            ) : (
              <Fullscreen />
            )}
          </button>
        )}

        <div
          style={{ zIndex: -100, cursor: "default" }}
          ref={ref => {
            this.mapEl = ref;
          }}
        />
        {this.props.aktivTab === "kartlag" && (
          <button
            className="geolocate map_button"
            alt="Geolokalisering"
            title="Geolokalisering"
            onClick={() => {
              this.props.handleFullscreen(false);
              this.handleLocate();
            }}
          >
            <LocationSearching />
          </button>
        )}
      </>
    );
  }

  handleLocate() {
    this.map.locate({ setView: true });
  }
}

export default LeafletTangram;
