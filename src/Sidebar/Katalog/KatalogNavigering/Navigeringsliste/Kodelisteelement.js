import { ListItem, Typography, ListItemText } from "@material-ui/core";
import React from "react";
import språk from "Funksjoner/språk";
import Bildeavatar from "GjenbruksElement/Bildeavatar";
import VolumIndikator from "./VolumIndikator";
import getSecondary from "./NavigeringslisteFunksjoner/getSecondary";
import kodeSuffix from "./NavigeringslisteFunksjoner/kodeSuffix";

class Kodelisteelement extends React.Component {
  shouldComponentUpdate(np) {
    if (np.areal !== this.props.areal) return true;
    if (np.value !== this.props.value) return true;
    if (np.opplyst !== this.props.opplyst) return true;
    return false;
  }

  render() {
    const {
      meta,
      parentkode,
      kode,
      url,
      visKode,
      onNavigate,
      onMouseEnter,
      onMouseLeave,
      areal,
      størsteAreal
    } = this.props;
    return (
      <>
        <ListItem
          dense={true}
          key={kode}
          onClick={() => onNavigate(url)}
          onMouseEnter={() => onMouseEnter && onMouseEnter({ kode, url })}
          onMouseLeave={() => onMouseLeave && onMouseLeave()}
          button={true}
        >
          <VolumIndikator størsteAreal={størsteAreal} areal={areal} />
          <Bildeavatar url={url} />
          <ListItemText
            style={{ width: "50%" }}
            primary={språk(meta.tittel)}
            secondary={getSecondary(meta)}
          />
          {visKode && (
            <Typography variant="caption" noWrap>
              {kodeSuffix(kode, parentkode)}
            </Typography>
          )}
        </ListItem>
        {/*kode === 'LA-KLG-AI' && (
          <ListItem>
            <Arealbruksintensitet value={meta.value} onChange={onChange} />
          </ListItem>
        )*/}
      </>
    );
  }
}

export default Kodelisteelement;
