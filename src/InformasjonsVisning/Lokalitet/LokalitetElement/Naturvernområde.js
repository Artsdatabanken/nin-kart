import React from "react";
import språk from "Funksjoner/språk";
import Overskrift from "../../Overskrift";
import NinCard from "../../NinCard";
import {
    CardActionArea,
    CardMedia,
    Collapse,
    CardContent,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Typography,
} from "@material-ui/core";
import config from "../../../Funksjoner/config";

const Naturvernområde = ({ tittel, bilde, url, onNavigate, overordnet, ...props }) => {
    return (
        <>
            {false && <Overskrift tittel="Geografi" subtekst="........" />}
            <NinCard title={språk(tittel)} heading={språk(overordnet[0].tittel)} canExpand hasData>
                {expanded => <>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardActionArea onClick={() => onNavigate(url)} >
                            {bilde && bilde.foto && bilde.foto.url && (
                                <CardMedia>
                                    <img src={bilde.foto.url} alt="foto" />
                                </CardMedia>
                            )}
                            <CardContent>
                                <Typography variant="body2">
                                    {props.revisjon?.dato?.førstvernet && <>Først vernet: {props.revisjon.dato.førstvernet.substring(0, 10)}<br /></>}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Collapse>
                </>}
            </NinCard>
        </>
    );
};

const Item = ({ primary, secondary, url, onClick }) => (
    <ListItem button onClick={() => onClick(url)}>
        <ListItemAvatar>
            <img src={config.logo(url)} alt="ikon" />
        </ListItemAvatar>
        <ListItemText primary={primary} secondary={secondary}></ListItemText>
    </ListItem>
);

export default Naturvernområde;
