import { Paper, withStyles } from '@material-ui/core'
import React from 'react'
import TopBarContainer from '../TopBar/TopBarContainer'
import { Panel, Ekspanderlinje } from '../components'
import Boble from './Boble'

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
  <Paper elevation={4} style={{ margin: 8 }}>
    {children}
  </Paper>
)

const styles = {}

const Forsidemeny = ({ classes, visForside, onVis, onSkjul, onClick }) => {
  return (
    <React.Fragment>
      <TopBarContainer>
        {visForside ? (
          <div style={{ width: 408 }}>
            <Panel style={{ color: 'hsla(0, 0%, 0%, 0.87)' }} />
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
                  <Boble kode="BS" tittel="Beskrivelse- system" />
                  <Boble kode="VV" tittel="Naturvern- område" />
                  <Boble kode="MI" tittel="Miljøvariabel" />
                  <Boble kode="AO" tittel="Administativt område" />
                  <Boble kode="RL" tittel="Truet natur" />
                </div>
              </Seksjon>
            </Papir>
            <Papir>
              <Seksjon tittel="Finibus interdum">
                Praesent metus quam, finibus interdum varius nec, sollicitudin
                at lacus. Curabitur finibus dictum ultrices. Aenean pretium,
                ipsum non facilisis lacinia, libero nisi tempor purus, a aliquet
                elit massa at sem. Ut euismod interdum faucibus.
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
            <Ekspanderlinje tekst="Skjul" mode="open" onSkjul={onSkjul} />
          </div>
        ) : (
          <Ekspanderlinje tekst="Se kartlag" mode="closed" onSkjul={onVis} />
        )}
      </TopBarContainer>
    </React.Fragment>
  )
}
export default withStyles(styles)(Forsidemeny)
