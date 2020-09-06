import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
  Button,
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
} from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { ExpandMore, ArrowDownward } from "@material-ui/icons/";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Kort from "./Kort";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 445,
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

/*
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
*/

const Landskap = ({ landskap }) => {
  const classes = useStyles();
  console.log({ landskap });
  if (!landskap) return null;
  const { tittel, beskrivelse, url } = landskap;
  const gradient = landskap.gradient && landskap.gradient["NN-LA-KLG"];
  const barn = gradient.barn;
  console.log({ barn });
  return (
    <>
      <Kort
        heading1={tittel.nb}
        heading2="Landskapstype"
        beskrivelse={beskrivelse.nb}
        url={url}
        barn={barn}
      ></Kort>
      {Object.values(barn).map((klg) => (
        <Klg tittel={klg.tittel} trinn={klg.trinn} />
      ))}
    </>
  );
};

const Klg = ({ tittel, trinn }) => {
  const aktiv = trinn.filter((t) => t.på);
  const min = aktiv[0];
  const max = aktiv[aktiv.length - 1];
  const heading1 =
    min == max ? min.tittel.nb : min.tittel.nb + " - " + max.tittel.nb;
  return <Kort heading1={heading1} heading2={tittel.nb} url={max.url} />;
};

export default Landskap;
