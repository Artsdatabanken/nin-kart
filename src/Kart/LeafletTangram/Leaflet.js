import L from "leaflet";
// -- WEBPACK: Load styles --
import "leaflet/dist/leaflet.css";
import React from "react";
import Tangram from "tangram";
import { createScene, updateScene } from "./scene/scene";
import { LocationSearching } from "@material-ui/icons";
import "../../style/Kart.scss";

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

class LeafletTangram extends React.Component {
  state = {
    windowXpos: 0,
    windowYpos: 0,
    buttonUrl: null,
    sted: null,
    data: null,
    koordinat: null
  };
  componentDidMount() {
    const options = {
      zoomControl: false,
      inertia: true,
      minZoom: 3
    };

    let map = L.map(this.mapEl, options);

    this.radiusMarker = null; // used for gpsMarker
    this.gpsMarker = null; // used for gps coordinate
    this.geolocationButton = null;

    map.setView(
      [this.props.latitude, this.props.longitude],
      this.props.zoom * 1.8
    );

    L.control.zoom({ position: "topright" }).addTo(map);
    L.DomUtil.addClass(map._container, "crosshair-cursor-enabled");
    this.map = map;
    let def = {
      //      logLevel: 'debug',
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

    // ICON IMAGES
    this.icon = L.icon({
      iconUrl: "/marker/baseline_place_black_18dp.png",
      iconSize: [36, 36],
      iconAnchor: [17, 35]
    });

    this.gpsicon = L.icon({
      iconUrl: "/marker/baseline_place_blue_18dp.png",
      iconSize: [36, 36],
      iconAnchor: [17, 35]
    });

    map.on("locationfound", e => this.onLocationFound(e));
    map.on("locationerror", e => this.onLocationError(e));

    if (this.props.markerCoordinates) {
      this.placeMarker(
        this.props.markerCoordinates.lng,
        this.props.markerCoordinates.lat
      );
    }
  }

  // GPS COORDINATE HANDLING
  geolocationFunc(e) {
    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
    this.handleLocate();
  }

  resetLocationLayers(e) {
    if (this.map && this.gpsMarker) {
      this.map.removeLayer(this.gpsMarker);
      this.gpsMarker = null;
    }
    if (this.map && this.radiusMarker) {
      this.map.removeLayer(this.radiusMarker);
      this.radiusMarker = null;
    }
    this.disableClick = true;
  }

  onLocationFound(e) {
    var radius = e.accuracy / 2;
    this.resetLocationLayers(e);
    this.radiusMarker = L.circle(e.latlng, radius).addTo(this.map);
    this.placeMarker(e.latlng.lat, e.latlng.lng, true);
  }

  onLocationError(e) {
    alert(e.message);
  }

  handleLocate() {
    this.map.stopLocate();
    this.map.locate({ setView: true });
  }

  // Update and change detection
  erEndret(prevProps) {
    if (this.props.aktiveLag !== prevProps.aktiveLag) return true;
    if (this.props.lokalitetdata !== prevProps.lokalitetdata) return true;
    if (this.props.meta !== prevProps.meta) return true;
    if (this.props.opplyst !== prevProps.opplyst) return true;
    if (this.props.show_current !== prevProps.show_current) return true;
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.markerCoordinates &&
      prevProps.markerCoordinates !== this.props.markerCoordinates
    ) {
      this.removeMarker();
      this.placeMarker(
        this.props.markerCoordinates.lat,
        this.props.markerCoordinates.lng
      );
    }
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

  updateMap(props) {
    if (this.layer.scene.config) {
      updateScene(this.layer.scene.config, props);
      this.layer.scene.updateConfig({ rebuild: true });
    } else {
      /*TODO:
      THIS removed error tree and crash.
      But I assume it existed for a reason...
      Seems events get called in the wrong order, causing trouble*/
      console.error(
        "missing config. start anew with empty config. See code to debug"
      );
      updateScene(false, props);
      //this.layer.scene.updateConfig({ rebuild: true });
    }
  }

  // Handle marker
  placeMarker(lat, lng, gps) {
    if (gps) {
      this.gpsMarker = L.marker([lat, lng], {
        icon: this.gpsicon,
        title: "velg gps-punktinformasjon"
      })
        .on("click", evt => this.setPoint(lat, lng, evt))
        .on("click", evt => this.resetLocationLayers(evt))
        .addTo(this.map);
    } else {
      this.marker = L.marker([lat, lng], {
        icon: this.icon,
        title: "åpne punktinformasjon"
      })
        .on("click", evt => this.markerClick(evt))
        .addTo(this.map);
    }
  }

  markerClick(e) {
    this.props.handleShowPunkt(!this.props.showPunkt);
  }

  removeMarker() {
    this.setState({
      sted: null,
      data: null
    });
    if (!this.marker) return;
    this.map.removeLayer(this.marker);
  }

  // Handle point lookup data
  setCoords(lat, lng, e) {
    let offset = this.marker._mapToAdd._mapPane._leaflet_pos;
    const coords = {
      lat: lat,
      lng: lng,
      windowXpos: e.x + offset.x,
      windowYpos: e.y - header_shift + offset.y
    };
    this.props.onMarkerClick(coords);
  }

  setUrl(lat, lng) {
    let urlparams = (this.props.path || "").split("?");
    let newurlstring = "";
    for (let i in urlparams) {
      if (!urlparams[i].includes("lng") && urlparams[i] !== "") {
        newurlstring += "?" + urlparams[i];
      }
    }
    this.props.history.push("?lng=" + lng + "&lat=" + lat + newurlstring);
  }

  setPoint(lat, lng, e) {
    this.removeMarker();
    this.placeMarker(lat, lng);
    this.setCoords(lat, lng, e);
    this.setUrl(lat, lng);
  }

  // general map events
  handleClick = e => {
    const latlng = e.leaflet_event.latlng;
    this.setPoint(latlng.lat, latlng.lng, e);
  };

  render() {
    return (
      <>
        <button
          className="geolocate map_control_button"
          onClick={e => this.geolocationFunc(e)}
          title={"Geolokalisering"}
          alt={"Geolokalisering"}
        >
          <LocationSearching />
        </button>
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
