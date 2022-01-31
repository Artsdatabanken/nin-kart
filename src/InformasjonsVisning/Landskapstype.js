import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  CardActionArea,
  CardMedia,
  ListSubheader
} from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import config from "../Funksjoner/config";
import { useHistory } from "react-router-dom";
import NinCard from "./NinCard";
import { Card } from "@material-ui/core";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";

import { ExpandMore } from "@material-ui/icons/";
import MoreVertIcon from "@material-ui/icons/MoreVert";
const useStyles = makeStyles(theme => ({
  root: {
    margin: 8
  },
  cardheader: {
    cursor: "pointer"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {},
  related: {
    cursor: "pointer"
  },
  relatedIcon: {
    transform: "rotate(-140deg)",
    color: "#9e9e9e",
    float: "right",
    position: "relative",
    top: -2
  }
}));

export default function Landskapstype(props) {
  const { heading1, heading2, barn, parenturl, url } = props;
  const classes = useStyles();
  const history = useHistory();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="subsection">
      <h4>{heading2}</h4>
      <div className="sectionbox">
        <p>
          En landskapstype er en samling av variasjoner i terreng og landeformer
          som sammen påvirker et større område. I kartleggingen er den minste
          graden som måles på en kvadratkilometer. Man kan dermed befinne seg i
          et isbrelandskap uten å være akkurat på en isbre. Det vil også kunne
          være noen små variasjoner som ikke bestemmer landskapstypen da de er
          små og derav ikke dominerende.
        </p>
      </div>

      <div className="sectionbox">
        <h5 className="sectionbox-header">
          <button
            className="avatarlink"
            onClick={() => history.push(parenturl)}
          >
            <Avatar>
              {url && (
                <img
                  alt=""
                  src={config.foto(url)}
                  style={{ height: 40, width: 40 }}
                />
              )}
            </Avatar>

            <ListItemText primary={heading1} />
          </button>
          <button
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            {false && <MoreVertIcon />}
            <ExpandMore />
          </button>
        </h5>
        {expanded && (
          <div>
            {props.url && (
              <CardActionArea onClick={() => history.push(url)}>
                <CardMedia
                  className={classes.media}
                  image={config.foto(props.url)}
                  title="Foto"
                />
              </CardActionArea>
            )}

            <ListSubheader disableSticky>
              Defineres av landskapsgradienter
            </ListSubheader>

            {barn &&
              Object.values(barn).map(b => (
                <Klg
                  key={b.url}
                  trinn={b.trinn || {}}
                  url={b.url}
                  onClick={() => history.push(b.url)}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

const Klg = ({ trinn, url, onClick }) => {
  const aktiv = trinn.filter(t => t.på);
  const min = aktiv[0];
  const max = aktiv[aktiv.length - 1];
  const heading1 =
    min === max ? min.tittel.nb : min.tittel.nb + " - " + max.tittel.nb;
  return (
    <ListItem button onClick={onClick}>
      <ListItemAvatar>
        <Avatar>
          {url && (
            <img alt="" src={config.foto(max.url)} style={{ width: 40 }} />
          )}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={heading1} />
    </ListItem>
  );
};
