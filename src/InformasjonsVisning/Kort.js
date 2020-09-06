import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  ListSubheader,
} from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { ExpandMore, ArrowDownward } from "@material-ui/icons/";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import config from "Funksjoner/config";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
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

export default function Kort(props) {
  const { heading1, heading2, beskrivelse, barn } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const history = useHistory();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.cardheader}
        onClick={handleExpandClick}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {props.url && <img src={config.foto(props.url)} />}
          </Avatar>
        }
        _action={
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <MoreVertIcon />
            {false && <ExpandMore />}
          </IconButton>
        }
        title={heading1}
        subheader={heading2}
      />
      {false && (
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            unexpanded
          </Typography>
        </CardContent>
      )}
      {false && (
        <CardActions disableSpacing>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMore />
          </IconButton>
          <CardActions></CardActions>
        </CardActions>
      )}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://data.artsdatabanken.no//Natur_i_Norge/Landskap/Typeinndeling/Innlandslandskap/Innlands%C3%A5s-_og_fjellandskap/Middels_kupert_%C3%A5s-_og_fjellandskap_under_skoggrensen/foto_408.jpg"
            title="Foto"
          />
        </CardActionArea>
        <CardContent>
          <Typography paragraph>{beskrivelse}</Typography>

          <ListSubheader disableSticky>
            Typen defineres av landskapsgradientene
          </ListSubheader>
          {barn &&
            Object.values(barn).map((b) => (
              <Klg
                trinn={b.trinn || {}}
                url={b.url}
                onClick={() => history.push(b.url)}
              />
            ))}
          <a className={classes.related} href="https://vg.no" target="_top">
            <ArrowDownward className={classes.relatedIcon} />
            <p>Relatert artikkel på Artsdatabanken.no</p>
          </a>
          <CardActions>
            <Button size="small" color="primary">
              Vis i kart
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </CardContent>
      </Collapse>
    </Card>
  );
}

const Klg = ({ trinn, url, onClick }) => {
  const aktiv = trinn.filter((t) => t.på);
  const min = aktiv[0];
  const max = aktiv[aktiv.length - 1];
  const heading1 =
    min == max ? min.tittel.nb : min.tittel.nb + " - " + max.tittel.nb;
  return (
    <ListItem button onClick={onClick}>
      <ListItemAvatar>
        <Avatar>{url && <img src={config.foto(url)} />}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={heading1} />
    </ListItem>
  );
};
