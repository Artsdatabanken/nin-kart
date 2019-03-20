import språk from "../språk";
import {
  Avatar,
  Divider,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";
import { VisibilityOutlined, VisibilityOffOutlined } from "@material-ui/icons";
import React from "react";
import { withRouter } from "react-router";

class Kartlagelement extends React.Component {
  render() {
    const {
      tittel,
      undertittel,
      kode,
      farge,
      onMouseLeave,
      onMouseEnter,
      onClick
    } = this.props;
    return (
      <>
        <ListItem
          button={true}
          dense={true}
          onClick={() => onClick(kode)}
          key={kode}
          onMouseEnter={() => onMouseEnter(kode)}
          onMouseLeave={() => {
            onMouseLeave(kode);
          }}
        >
          <IconButton
            onClick={e => {
              this.props.onUpdateLayerProp(
                kode,
                "erSynlig",
                !this.props.erSynlig
              );
              e.stopPropagation();
            }}
          >
            {this.props.erSynlig ? (
              <VisibilityOutlined style={{ color: "#333" }} />
            ) : (
              <VisibilityOffOutlined style={{ color: "#aaa" }} />
            )}
          </IconButton>
          <ListItemText primary={språk(tittel)} secondary={undertittel} />
          <ListItemSecondaryAction style={{ paddingRight: 8 }}>
            <Avatar
              style={{
                width: 24,
                height: 24,
                filter: "drop-shadow(1px 1px 1px #666)",
                backgroundColor: farge,
                src: !farge && "/" + kode + ".png"
              }}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
      </>
    );
  }
}

export default withRouter(withTheme()(Kartlagelement));
