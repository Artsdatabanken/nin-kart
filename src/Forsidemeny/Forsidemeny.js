import {
  Typography,
  ListItem,
  ListItemText,
  Paper,
  withStyles
} from "@material-ui/core";
import React from "react";
import TopBarContainer from "../TopBar/TopBarContainer";
import { Panel, Ekspanderlinje } from "../components";
import Boble from "./Boble";
import Collapse from "@material-ui/core/Collapse";

const Seksjon = ({ tittel, children }) => (
  <div>
    <Typography
      style={{
        padding: "10px 20px",
        fontSize: 15,
        fontWeight: 500
      }}
      gutterBottom
    >
      {tittel}
    </Typography>
    <div
      style={{
        display: "flex",
        fontWeight: 400,
        fontSize: 14,
        padding: "10px 20px",
        color: "hsla(0, 0%, 0%, 0.54)"
      }}
    >
      {children}
    </div>
  </div>
);

const Papir = ({ children }) => (
  <Paper elevation={4} style={{ marginTop: 8, width: 392 }}>
    {children}
  </Paper>
);

const styles = {
  container: {
    paddingLeft: 8,
    paddingTop: 2
  }
};

const Forsidemeny = ({ classes, visForside, onVis, onAktiver, onClick }) => {
  return (
    <React.Fragment>
      <Panel>
        <TopBarContainer removeResultsOnBlur={!visForside}>
          <Collapse
            in={visForside}
            collapsedHeight="52px"
            classes={{
              container: classes.container
            }}
          >
            <React.Fragment>
              <Ekspanderlinje
                tekst="Katalog"
                erÅpen={visForside}
                onSkjul={onVis}
              />
              <Seksjon>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gridGap: "6px"
                  }}
                >
                  <Boble kode="LA" tittel="Landskap" />
                  <Boble kode="NA" tittel="Natursystem" />
                  <Boble
                    kode="VV"
                    url="Naturvernområde"
                    tittel="Naturvern- område"
                  />
                  <Boble kode="RL" url="Truet_natur" tittel="Truet natur" />
                  <Boble kode="AO" url="Fylke" tittel="Fylke" />
                </div>
              </Seksjon>
              <Papir>
                <Seksjon tittel="Bokmerker">
                  <ListItem
                    button
                    onClick={() =>
                      onAktiver(["Natur_i_Norge/Landskap/Landskapsgradient"])
                    }
                  >
                    <ListItemText primary="Landskapskart" secondary="LA-KLG" />
                  </ListItem>
                </Seksjon>
              </Papir>
              <Papir>
                <Seksjon tittel="Dataleverandører">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gridGap: "10px"
                    }}
                  >
                    <Boble kode="OR-MD" tittel="Miljødirektoratet" />
                    <Boble
                      kode="OR-GU"
                      tittel="NGU"
                      url="Norges_Geologiske_Undersøkelse"
                    />
                    <Boble
                      kode="OR-NI"
                      tittel="NINA"
                      url="Norsk_institutt_for_naturforskning"
                    />
                    <Boble
                      kode="OR-SB"
                      tittel="SSB"
                      url="Statistisk_sentralbyrå"
                    />
                    <Boble kode="OR-KV" tittel="Kartverket" />
                    <Boble kode="OR-AD" tittel="Artsdatabanken" />
                  </div>
                </Seksjon>
              </Papir>
            </React.Fragment>
          </Collapse>
        </TopBarContainer>
      </Panel>
    </React.Fragment>
  );
};
export default withStyles(styles)(Forsidemeny);
