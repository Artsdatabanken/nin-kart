import typesystem from '@artsdatabanken/typesystem'
import { List, Paper } from '@material-ui/core'
import React from 'react'
import FetchContainer from '../../FetchContainer'
import Fakta from './Fakta'
import Graf from './Graf'
import Kodekort from './Kodekort'
import Kodeliste from './Kodeliste'
class KodeVindu extends React.Component {
  render() {
    const props = this.props
    const avatarUtenRamme = props.meta.utenRamme
    return (
      <FetchContainer>
        <Paper zDepth={4}>
          {props.meta && (
            <Kodekort
              {...props.meta}
              onGoToCode={props.onGoToCode}
              isActiveLayer={props.isActiveLayer}
              onToggleLayer={props.onToggleLayer}
              onFitBounds={props.onFitBounds}
              data={props.data}
              language={props.language}
            />
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
            {(props.meta.ingress || props.meta.infoUrl) && (
              <div style={{ fontSize: 13, color: 'rgba(0,0,0,0.87)' }}>
                {props.meta.ingress}
                {props.meta.infoUrl && (
                  <span>
                    &nbsp;
                    <a
                      target="top"
                      rel="noopener"
                      style={{ color: 'rgba(0,0,0,0.87)' }}
                      href={props.meta.infoUrl}
                    >
                      {typesystem.capitalizeTittel(
                        new URL(props.meta.infoUrl).host
                          .split('.')
                          .splice(-2, 1)[0]
                      )}
                    </a>
                  </span>
                )}
              </div>
            )}
          </div>
          <Fakta
            tittel="Areal"
            synlig={props.data.antallNaturomrader}
            verdi={`${(props.data.antallNaturomrader * 1.3).toFixed(
              0
            )} km² (i ${props.data.antallNaturomrader} områder)`}
          />
          <Fakta
            tittel="Observerte arter"
            verdi={props.data.antallArter}
            synlig={props.data.antallArter}
          />
          <List>
            <Kodeliste
              title={`Innhold`}
              størsteAreal={props.data.størsteAreal}
              apidata={props.data ? props.data.barn : []}
              metadata={props.meta.barn}
              onGoToCode={props.onGoToCode}
              onMouseEnter={props.onMouseEnter}
              onMouseLeave={props.onMouseLeave}
              language={props.language}
              avatarUtenRamme={avatarUtenRamme}
            />
            {props.meta.graf && (
              <Graf graf={props.meta.graf} onGoToCode={props.onGoToCode} />
            )}
          </List>
        </Paper>
      </FetchContainer>
    )
  }
}

export default KodeVindu
