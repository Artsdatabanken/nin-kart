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

const sameParent = (array, i) => {
  array = array.map((e) => e[i]);
  for (let n = 1; n < array.length; n++)
    if (array[n].kode !== array[n - 1].kode) return false;
  return true;
};

const finnFellesOverordnet = (typer) => {
  if (typer.length === 0) return null;
  if (typer.length === 1) return typer[0].overordnet[0];
  const oos = typer.map((e) => e.overordnet.reverse());
  console.log({ oos });
  let max = Math.max(...oos.map((e) => e.length));
  for (let i = 0; i < max; i++) {
    if (!sameParent(oos, i)) return oos[0][i - 1];
  }
  return oos[0].pop();
};

const Naturtyper = (props) => {
  const { type } = props;
  if (!type) return null;
  console.log("typer", type);
  const forelder = finnFellesOverordnet(props.type);
  console.log({ forelder });
  return (
    <>
      <Naturtype
        key={type.kode}
        tittel={forelder.tittel}
        bilde={forelder.bilde}
        typer={type}
      />
      )
      {false &&
        props.variabler &&
        props.variabler.map((variabel) => (
          <Naturtype key={variabel.kode} {...variabel} />
        ))}
    </>
  );
};

const Naturtype = ({ tittel, bilde, onNavigate, typer, ...props }) => {
  console.log({ props });
  return (
    <>
      <Overskrift tittel="Naturtype" subtekst="........" />
      <NinCard heading="Naturtype" canExpand>
        {bilde && bilde.foto && bilde.foto.url && (
          <CardMedia>
            <img src={bilde.foto.url} alt="foto" />
          </CardMedia>
        )}
        <CardContent>
          <Typography gutterBottom variant="subtitle1">
            {språk(tittel)}
          </Typography>
          <Typography variant="body2">
            {false && JSON.stringify(props)}
          </Typography>
        </CardContent>
        <CardContent>
          {typer.map((type) => (
            <Item
              key={type.kode}
              primary={språk(type.tittel)}
              url={type.url}
              onClick={onNavigate}
            />
          ))}
        </CardContent>
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

export default Naturtyper;
