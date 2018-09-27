import { withRouter } from 'react-router'
import {
  AppBar,
  Avatar,
  Toolbar,
  Typography,
  IconButton,
  Paper,
  withStyles,
} from '@material-ui/core'
import { ExpandLess } from '@material-ui/icons'
import React from 'react'
import TopBarContainer from '../TopBar/TopBarContainer'
import { Panel, Ekspanderlinje } from '../components'
import BildeAvatar from '../Kodetre/Kodeliste/Bildeavatar'

const Katalog = () => <div style={{ height: 100 }}>asdfasd</div>

const Seksjon = ({ tittel, children }) => (
  <div>
    <div
      style={{
        fontSize: 15,
        padding: '10px 20px',
        fontWeight: 500,
      }}
    >
      {tittel}
    </div>
    <div
      style={{
        display: 'flex',
        fontSize: 15,
        fontWeight: 400,
        padding: '10px 20px',
        color: 'hsla(0, 0%, 0%, 0.54)',
      }}
    >
      {children}
    </div>
  </div>
)

const Papir = ({ children }) => (
  <Paper elevation={4} style={{ margin: 8 }} square>
    {children}
  </Paper>
)

const Boble = ({ kode, farge, tittel, onClick }) => (
  <div
    onClick={() => onClick(kode)}
    style={{
      padding: 8,
      textAlign: 'center',
      _alignItems: 'center',
      _justifyContent: 'center',
    }}
  >
    <div style={{ display: 'inline-block', paddingBottom: 8 }}>
      <BildeAvatar kode={kode} />
    </div>
    <div
      style={{
        fontWeight: 400,
        fontSize: 14,
        color: 'hsla(0, 0%, 0%, 0.54)',
      }}
    >
      {tittel}
    </div>
  </div>
)

const styles = {}

const Forsidemeny = ({ classes, onSkjul, onClick }) => {
  return (
    <React.Fragment>
      <TopBarContainer inlineResultat>
        <Panel>
          <Papir>
            <Seksjon tittel="Datakatalog">
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gridGap: '6px',
                }}
              >
                <Boble kode="NA" tittel="Natursystem" />
                <Boble kode="BS" tittel="Beskrivelsesystem" />
                <Boble kode="VV" tittel="Naturvernområde" />
                <Boble kode="MI" tittel="Miljøvariabel" />
                <Boble kode="AO" tittel="Administativt område" />
                <Boble kode="RL" tittel="Truet natur" />
              </div>
            </Seksjon>
          </Papir>
          <Papir>
            <Seksjon tittel="xxxx">
              Praesent metus quam, finibus interdum varius nec, sollicitudin at
              lacus. Curabitur finibus dictum ultrices. Aenean pretium, ipsum
              non facilisis lacinia, libero nisi tempor purus, a aliquet elit
              massa at sem. Ut euismod interdum faucibus.
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
          <Ekspanderlinje />
        </Panel>
      </TopBarContainer>
    </React.Fragment>
  )
}
export default withStyles(styles)(Forsidemeny)
