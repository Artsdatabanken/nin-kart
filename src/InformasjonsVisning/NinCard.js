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
    maxWidth: 408,
    margin: 16,
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
  const { heading, canExpand, children } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const history = useHistory();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card raised className={classes.root}>
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
      {children}
    </Card>
  );
}
