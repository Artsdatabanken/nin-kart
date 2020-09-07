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

const Naturvernområde = ({ tittel, bilde, url, onNavigate, ...props }) => {
    console.log('verneområde', JSON.stringify(props))
    return (
        <>
            {false && <Overskrift tittel="Geografi" subtekst="........" />}
            <NinCard heading={språk(tittel)} canExpand hasData>
                {expanded => <>
                    <CardActionArea onClick={() => onNavigate(url)} >
                        {bilde && bilde.foto && bilde.foto.url && (
                            <CardMedia>
                                <img src={bilde.foto.url} alt="foto" />
                            </CardMedia>
                        )}
                        <CardContent>
                            <Typography variant="body2">
                                Først vernet i {props.revisjon.dato.førstvernet}<br />
                        xx
                    </Typography>
                        </CardContent>
                    </CardActionArea>
                </>}
            </NinCard>
        </>
    );
};

/*
                <Collapse in={true} timeout="auto" unmountOnExit>
                </Collapse>
*/

const Item = ({ primary, secondary, url, onClick }) => (
    <ListItem button onClick={() => onClick(url)}>
        <ListItemAvatar>
            <img src={config.logo(url)} alt="ikon" />
        </ListItemAvatar>
        <ListItemText primary={primary} secondary={secondary}></ListItemText>
    </ListItem>
);

export default Naturvernområde;
