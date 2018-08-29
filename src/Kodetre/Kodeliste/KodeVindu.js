import { List } from '@material-ui/core'
import React from 'react'
import FetchContainer from '../../FetchContainer'
import språk from '../../språk'
import Graf from './Graf'
import Kodekort from './Kodekort'
import Kodeliste from './Kodeliste'
import Statistikk from './Statistikk'

class KodeVindu extends React.Component {
  render() {
    const props = this.props
    const avatarUtenRamme = props.meta.utenRamme
    return (
      <FetchContainer>
        {props.meta && (
          <div
            square="true"
            elevation={4}
            style={{
              position: 'relative',
              top: -72,
            }}
          >
            <Kodekort
              {...props.meta}
              onGoToCode={props.onGoToCode}
              erAktivert={props.erAktivert}
              onToggleLayer={props.onToggleLayer}
              onFitBounds={props.onFitBounds}
              data={props.data}
              language={props.language}
            />
            <List>
              {props.meta.prefiks !== 'AO' && (
                <Statistikk
                  tittel={språk(props.meta.tittel)}
                  toppnavn={this.toppnivåNavn(props.meta.overordnet)}
                  ingress={props.meta.ingress}
                  infoUrl={props.meta.infoUrl}
                  stats={props.meta.stats || {}}
                  arealVindu={999999}
                  arterVindu={props.data.antallArter}
                  geometrierVindu={props.data.antallNaturomrader}
                />
              )}
              <Kodeliste
                title={`Innhold`}
                størsteAreal={props.data.størsteAreal}
                apidata={props.data ? props.data.barn : []}
                metadata={props.meta.barn}
                onGoToCode={props.onGoToCode}
                onMouseEnter={props.onMouseEnter}
                onMouseLeave={props.onMouseLeave}
                opplystKode={props.opplystKode}
                language={props.language}
                avatarUtenRamme={avatarUtenRamme}
              />
              {props.meta.graf && (
                <Graf
                  graf={props.meta.graf}
                  apidata={props.data ? props.data.barn : []}
                  onGoToCode={props.onGoToCode}
                  onMouseEnter={props.onMouseEnter}
                  onMouseLeave={props.onMouseLeave}
                  opplystKode={props.opplystKode}
                />
              )}
            </List>
          </div>
        )}
      </FetchContainer>
    )
  }

  toppnivåNavn(forfedre) {
    if (forfedre.length < 2) return null
    return språk(forfedre[forfedre.length - 2].tittel)
  }
}

export default KodeVindu
