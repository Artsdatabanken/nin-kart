import React from "react";
import språk from "Funksjoner/språk";
import Overskrift from "../../Overskrift";
import NinCard from "../../NinCard";
import {
    CardMedia,
    Collapse,
    CardContent,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Typography,
} from "@material-ui/core";
import config from "../../../Funksjoner/config";

const Naturvernområde = ({ tittel, bilde, onNavigate, ...props }) => {
    console.log(JSON.stringify(props))
    return (
        <>
            {false && <Overskrift tittel="Geografi" subtekst="........" />}
            <NinCard heading={språk(tittel)} canExpand>
                {expanded => <>
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
                </>}
            </NinCard>
        </>
    );
};

/*
                <Collapse in={true} timeout="auto" unmountOnExit>
                    {sted && (
                        <Item
                            primary={språk(sted.navn)}
                            secondary={getSted(sted)}
                            url={sted.meta.url}
                            onClick={onNavigate}
                        />
                    )}
                    {kommune && (
                        <Item
                            primary={språk(kommune.tittel)}
                            secondary="Kommune"
                            url={kommune.url}
                            onClick={onNavigate}
                        />
                    )}
                    {fylke && (
                        <Item
                            primary={språk(fylke.tittel)}
                            secondary="Fylke"
                            url={fylke.url}
                            onClick={onNavigate}
                        />
                    )}
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
