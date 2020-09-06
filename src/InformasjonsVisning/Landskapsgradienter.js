import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
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

export default function Landskapsgradienter(props) {
  const { heading1, heading2, beskrivelse, sample } = props;
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
        _title={heading1}
        subheader={heading1}
      />
      <CardContent>
        {sample &&
          Object.values(sample).map((b) => (
            <Klg
              key={b.url}
              v={b.v}
              måleenhet={b.måleenhet}
              tittel={b.tittel}
              trinn={b.trinn}
              url={b.url}
              onClick={() => history.push(b.url)}
            />
          ))}
      </CardContent>

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
          {props.url && (
            <CardMedia
              className={classes.media}
              image={config.foto(props.url)}
              title="Foto"
            />
          )}
        </CardActionArea>
        <CardContent>
          <Typography paragraph>{beskrivelse}</Typography>

          <ListSubheader disableSticky>Gradientverdier i punktet</ListSubheader>
          {false && (
            <a className={classes.related} href="https://vg.no" target="_top">
              <ArrowDownward className={classes.relatedIcon} />
              <p>Relatert artikkel på Artsdatabanken.no</p>
            </a>
          )}
          <Divider />
        </CardContent>
      </Collapse>
    </Card>
  );
}

const Klg = ({ trinn, tittel, url, onClick, v, måleenhet, ...props }) => {
  console.log({ props });
  const verdi = parseInt(v) + " " + måleenhet;
  return (
    <ListItem button onClick={onClick}>
      <ListItemAvatar>
        <Avatar>{url && <img src={config.foto(url)} />}</Avatar>
      </ListItemAvatar>
      <ListItemSecondaryAction>
        <Typography variant="body1">{verdi}</Typography>
      </ListItemSecondaryAction>
      <ListItemText primary={trinn.tittel.nb} secondary={tittel.nb} />
    </ListItem>
  );
};
