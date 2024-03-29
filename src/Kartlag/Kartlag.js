import React from "react";
import CurrentElement from "./CurrentElement/CurrentElement";
import FavoriteLayers from "./Favorites/FavoriteLayers";
import Breadcrumbs from "./Breadcrumbs";
import SidebarHeader from "./SidebarHeader";
import MobileOpenButton from "./MobileOpenButton";
import HistoryLayers from "./History/HistoryLayers";
import { Close, Layers } from "@material-ui/icons";

class Kartlag extends React.Component {
  state = {
    showKartlag: false
  };
  render() {
    let koder = this.props.aktiveLag;
    const keys = Object.keys(koder);
    const { onUpdateLayerProp } = this.props;
    let isstartpage = false;
    if (
      this.props.path === "/kart" ||
      this.props.path === "/hjem" ||
      this.props.path === "/start" ||
      this.props.path === "/index" ||
      this.props.path === "/map"
    ) {
      isstartpage = true;
    }

    const className =
      "kartlag sidebar " +
      (this.props.fullscreen && "fullscreen ") +
      (this.state.showKartlag
        ? " kartlag_content_open"
        : " kartlag_content_closed");

    return (
      <>
        <MobileOpenButton
          showKartlag={this.state.showKartlag}
          setShowKartlag={() => {
            this.setState({ showKartlag: !this.state.showKartlag });
          }}
          props={this.props}
        />

        <div className={className}>
          <button
            className="closetab hide_on_mobile show-kartlag-button layerbutton arrow_button"
            onClick={this.props.handleFullscreen}
          >
            {this.props.fullscreen ? <Layers /> : <Close />}
          </button>
          <SidebarHeader />
          {this.props.meta && (
            <Breadcrumbs
              isstartpage={isstartpage}
              onNavigate={this.props.onNavigate}
              meta={this.props.meta}
              breadcrumbs={this.props.meta.overordnet.reverse()}
            />
          )}

          <CurrentElement
            aktiveLag={this.props.aktiveLag}
            meta={this.props.meta}
            onNavigate={this.props.onNavigate}
            aktivTab={this.props.aktivTab}
            onSetAktivTab={this.props.onSetAktivTab}
            handleShowInfo={this.props.handleShowInfo}
            showInfo={this.props.showInfo}
            onUpdateMetaProp={this.props.onUpdateMetaProp}
            onToggleLayer={this.props.onToggleLayer}
            opplyst={this.props.opplyst}
            onMouseEnter={this.props.onMouseEnter}
            onMouseLeave={this.props.onMouseLeave}
            path={this.props.path}
            parent={this.props.parent}
            isstartpage={isstartpage}
            onUpdateLayerProp={onUpdateLayerProp}
          />

          <FavoriteLayers keys={keys} koder={koder} props={this.props} />

          <HistoryLayers keys={keys} props={this.props} />
        </div>
      </>
    );
  }
}

export default Kartlag;
