import {
  Typography,
  ListItem,
  ListItemText,
  Paper,
  withStyles,
} from '@material-ui/core'
import React from 'react'
import TopBarContainer from '../TopBar/TopBarContainer'
import { Panel, Ekspanderlinje } from '../components'
import Boble from './Boble'
import Collapse from '@material-ui/core/Collapse'

const Seksjon = ({ tittel, children }) => (
  <div>
    <Typography
      style={{
        padding: '10px 20px',
        fontSize: 15,
        fontWeight: 500,
      }}
      gutterBottom
    >
      {tittel}
    </Typography>
    <div
      style={{
        display: 'flex',
        fontWeight: 400,
        fontSize: 14,
        padding: '10px 20px',
        color: 'hsla(0, 0%, 0%, 0.54)',
      }}
    >
      {children}
    </div>
  </div>
)

const Papir = ({ children }) => (
  <Paper elevation={4} style={{ marginTop: 8, width: 392 }}>
    {children}
  </Paper>
)

const styles = {}

const Forsidemeny = ({ classes, visForside, onVis, onAktiver, onClick }) => {
  return (
    <React.Fragment>
      <Panel transparent={!visForside}>
        <TopBarContainer removeResultsOnBlur={!visForside}>
          <Collapse in={visForside} collapsedHeight="46px">
            <React.Fragment>
              <Ekspanderlinje
                tekst="Datakatalog"
                erÅpen={visForside}
                onSkjul={onVis}
              />
              <Papir>
                <Seksjon tittexl="Datakatalog">
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gridGap: '6px',
                    }}
                  >
                    <Boble kode="LA" tittel="Landskap" />
                    <Boble kode="NA" tittel="Natursystem" />
                    <Boble kode="VV" tittel="Naturvern- område" />
                    <Boble kode="RL" tittel="Truet natur" />
                    <Boble kode="AO" tittel="Administativt område" />
                  </div>
                </Seksjon>
              </Papir>
              <Papir>
                <Seksjon tittel="Bokmerker">
                  <ListItem
                    button
                    onClick={() => onAktiver(['NA_I', 'MI_KA-B'])}
                  >
                    <ListItemText
                      primary="Snø og is i temmelig kalkfattige områder"
                      secondary="NA_I, MI_KA-B"
                    />
                  </ListItem>
                </Seksjon>
              </Papir>
              <Papir>
                <Seksjon tittel="Dataleverandører">
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gridGap: '10px',
                    }}
                  >
                    <Boble kode="OR_MD" tittel="Miljødirektoratet" />
                    <Boble kode="OR_GU" tittel="NGU" />
                    <Boble kode="OR_NI" tittel="NINA" />
                    <Boble kode="OR_SB" tittel="SSB" />
                    <Boble kode="OR_KV" tittel="Kartverket" />
                    <Boble kode="OR_AD" tittel="Artsdatabanken" />
                  </div>
                </Seksjon>
              </Papir>
            </React.Fragment>
          </Collapse>
        </TopBarContainer>
      </Panel>
    </React.Fragment>
  )
}
export default withStyles(styles)(Forsidemeny)
