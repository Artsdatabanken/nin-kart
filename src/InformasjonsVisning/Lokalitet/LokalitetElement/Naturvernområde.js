import React from "react";
import språk from "Funksjoner/språk";
import Overskrift from "../../Overskrift";
import NinCard from "../../NinCard";
import {
    CardActionArea,
    CardMedia,
    Collapse,
    CardContent,
    Typography,
} from "@material-ui/core";

const Naturvernområde = ({ tittel, bilde, url, onNavigate, overordnet, ...props }) => {
    return (
        <>
            {false && <Overskrift tittel="Geografi" subtekst="........" />}
            <NinCard image="Naturvernområde" title={språk(tittel)} heading={språk(overordnet[0].tittel)} canExpand hasData>
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

export default Naturvernområde;
