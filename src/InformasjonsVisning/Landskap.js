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
import Landskapstype from "./Landskapstype";
import Landskapsgradienter from "./Landskapsgradienter";

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

const Landskap = ({ landskap }) => {
  const classes = useStyles();
  if (!landskap) return null;
  const { tittel, beskrivelse, url } = landskap;
  const gradient = landskap.gradient && landskap.gradient["NN-LA-KLG"];
  const barn = gradient.barn;
  return (
    <>
      <Landskapstype
        heading1={tittel.nb}
        heading2="Landskapstype"
        beskrivelse={beskrivelse.nb}
        url={url}
        barn={barn}
      ></Landskapstype>
      <Landskapsgradienter
        heading1="Landskapsgradienter"
        sample={landskap.sample}
      />
    </>
  );
};

export default Landskap;
