import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Card, CardActionArea, CardHeader, CardMedia } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { ExpandMore } from "@material-ui/icons/";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import config from "Funksjoner/config";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: "2000px",
    margin: 8,
    _transitionDuration: "1s",
    transition: "max-height 3s ease-in",
    //transition: 'height 5.4s linear',
    //                transition: theme.transitions.create("transform", {duration: theme.transitions.duration.shortest,}),
  },
  roothide: {
    maxHeight: 0,
    overflow: "hidden",
    margin: 8,
    _transitionDuration: "1s",
    transition: "max-height 3s ease-out",
    //transition: 'height 5.4s linear',
    //                transition: theme.transitions.create("transform", {duration: theme.transitions.duration.shortest,}),
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
}));

export default function NinCard(props) {
  const { heading, title, canExpand, children, hasData } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const history = useHistory();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={hasData ? classes.root : classes.roothide}>
      <CardHeader
        className={classes.cardheader}
        onClick={handleExpandClick}
        action={
          canExpand && (
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              {false && <MoreVertIcon />}
              <ExpandMore />
            </IconButton>
          )
        }
        title={title}
        titleTypographyProps={{ variant: "subtitle1" }}
        subheader={heading}
      ></CardHeader>

      <CardActionArea>
        {props.url && (
          <CardMedia
            className={classes.media}
            image={config.foto(props.url)}
            title="Foto"
          />
        )}
      </CardActionArea>
      {children && children(expanded)}
    </Card>
  );
}
