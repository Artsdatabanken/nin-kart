import MediaQuery from 'react-responsive'
import React from 'react'
import Kodekort from './Kodekort'
import { Paper, List, div } from 'material-ui'
import FetchContainer from '../../FetchContainer'
import Kodeliste from './Kodeliste'
import { RaisedButton } from 'material-ui'
import Graf from './Graf'

const Fact = ({ tittel, verdi, synlig }) => {
  if (!synlig || !verdi) return null
  return (
    <div
      style={{
        fontSize: 13,
        paddingLeft: 24,
        lineHeight: '1.5em',
      }}
    >
      <span style={{ fontWeight: 700 }}>{tittel}:&nbsp;</span>
      {verdi}
    </div>
  )
}

class KodeVindu extends React.Component {
  render() {
    const props = this.props
    const avatarUtenRamme = props.meta.utenRamme
    return (
      <FetchContainer>
        <Paper
          zDepth={4}
          style={{
            height: '100%',
            position: 'fixed',
            left: 0,
            top: 0,
            width: 408,
            overflow: 'auto',
          }}
        >
          {props.meta && (
            <Kodekort
              {...props.meta}
              onGoToCode={props.onGoToCode}
              onAddSelected={props.onAddSelected}
              data={props.data}
              language={props.language}
            />
          )}
          {props.meta.bbox && (
            <MediaQuery maxWidth={1224}>
              <div style={{ float: 'right', marginRight: 24, marginTop: 16 }}>
                <RaisedButton
                  onClick={() => props.onFitBounds(props.meta.bbox)}
                >
                  Vis i kart
                </RaisedButton>
              </div>
            </MediaQuery>
          )}
          <div style={{ padding: 24 }}>
            {(props.meta.ingress ||
              props.data.antallNaturomrader ||
              props.data.antallArter) && (
              <div
                style={{
                  fontSize: 18,
                  paddingBottom: 24,
                  color: 'rgba(0, 0, 0, 0.54)',
                }}
              >
                Fakta
              </div>
            )}
            {props.meta.ingress && (
              <div style={{ fontSize: 13, color: 'rgba(0,0,0,0.87)' }}>
                {props.meta.ingress}
                {props.meta.infoUrl && (
                  <span>
                    &nbsp;<a
                      target="top"
                      style={{ color: 'rgba(0,0,0,0.87)' }}
                      href={props.meta.infoUrl}
                    >
                      Artsdatabanken
                    </a>
                  </span>
                )}
              </div>
            )}
          </div>
          <Fact
            tittel="Areal"
            synlig={props.data.antallNaturomrader}
            verdi={`${(props.data.antallNaturomrader * 1.3).toFixed(
              0
            )} km² (i ${props.data.antallNaturomrader} områder)`}
          />
          <Fact
            tittel="Arter observert"
            verdi={props.data.antallArter}
            synlig={props.data.antallArter}
          />
          <List>
            <Kodeliste
              title={`Innhold`}
              størsteAreal={props.data.størsteAreal}
              apidata={props.data ? props.data.barn : []}
              metadata={props.meta.barn}
              ekspandertKode={this.props.ekspandertKode}
              onGoToCode={props.onGoToCode}
              onMouseEnter={props.onMouseEnter}
              onMouseLeave={props.onMouseLeave}
              onShowColorpicker={this.props.onShowColorpicker}
              onUpdateLayerProp={props.onUpdateLayerProp}
              language={props.language}
              avatarUtenRamme={avatarUtenRamme}
            />
            {props.meta.graf && (
              <Graf graf={props.meta.graf} onGoToCode={props.onGoToCode} />
            )}
            {props.meta.prosedyrekategori && (
              <Kodeliste
                title="Definisjon"
                metadata={{
                  [props.meta.prosedyrekategori.kode]: {
                    ...props.meta.prosedyrekategori,
                    undertittel: { nb: 'Prosedyrekategori' },
                  },
                  [props.meta.definisjonsgrunnlag.kode]: {
                    ...props.meta.definisjonsgrunnlag,
                    undertittel: { nb: 'Definisjon' },
                  },
                }}
                onGoToCode={props.onGoToCode}
                language={props.language}
              />
            )}
          </List>
        </Paper>
      </FetchContainer>
    )
  }
}

export default KodeVindu
