import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  CardActionArea,
  CardMedia,
  ListSubheader,
} from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import config from "../Funksjoner/config";
import { useHistory } from "react-router-dom";
import NinCard from "./NinCard";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 8,
  },
  cardheader: {
    cursor: "pointer",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {},
  related: {
    cursor: "pointer",
  },
  relatedIcon: {
    transform: "rotate(-140deg)",
    color: "#9e9e9e",
    float: "right",
    position: "relative",
    top: -2,
  },
}));

export default function Landskapstype(props) {
  const { heading1, heading2, barn, parenturl, url } = props;
  const classes = useStyles();
  const history = useHistory();

  return (
    <NinCard
      image="Natur_i_Norge/Landskap"
      heading={heading2}
      canExpand
      hasData={true}
    >
      {(expanded) => (
        <>
          <ListItem button onClick={() => history.push(parenturl)}>
            <ListItemAvatar>
              <Avatar>
                {url && (
                  <img
                    alt=""
                    src={config.foto(url)}
                    style={{ height: 40, width: 40 }}
                  />
                )}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={heading1} />
          </ListItem>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
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
              Object.values(barn).map((b) => (
                <Klg
                  key={b.url}
                  trinn={b.trinn || {}}
                  url={b.url}
                  onClick={() => history.push(b.url)}
                />
              ))}
          </Collapse>
        </>
      )}
    </NinCard>
  );
}

const Klg = ({ trinn, url, onClick }) => {
  const aktiv = trinn.filter((t) => t.på);
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
