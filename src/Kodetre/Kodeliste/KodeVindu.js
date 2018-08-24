import typesystem from '@artsdatabanken/typesystem'
import { List, ListItemText, ListSubheader, Paper } from '@material-ui/core'
import React from 'react'
import FetchContainer from '../../FetchContainer'
import Fakta from './Fakta'
import Graf from './Graf'
import Kodekort from './Kodekort'
import Kodeliste from './Kodeliste'

const F = ({ ingress, infoUrl, antallNaturomrader, antallArter }) => (
  <React.Fragment>
    <ListSubheader>Fakta</ListSubheader>
    <ListItemText>
      <div
        style={{
          fontSize: 13,
          color: 'rgba(0,0,0,0.87)',
          paddingLeft: 24,
        }}
      >
        {ingress}
        {infoUrl && (
          <span>
            &nbsp;
            <a
              target="top"
              rel="noopener"
              style={{ color: 'rgba(0,0,0,0.87)' }}
              href={infoUrl}
            >
              {typesystem.capitalizeTittel(
                new URL(infoUrl).host.split('.').splice(-2, 1)[0]
              )}
            </a>
          </span>
        )}
      </div>
    </ListItemText>
    {false && (
      <ListItemText>
        Skogsmark utgjør med 531 kvm 3.3% av kartlagte natursystemer i Norge
      </ListItemText>
    )}
    <ListItemText>
      <Fakta
        tittel="Areal"
        verdi={`${(antallNaturomrader * 1.3).toFixed(
          0
        )} km² (i ${antallNaturomrader} områder)`}
      />
      <Fakta tittel="Observerte arter" verdi={antallArter} />
    </ListItemText>
  </React.Fragment>
)

class KodeVindu extends React.Component {
  render() {
    const props = this.props
    const avatarUtenRamme = props.meta.utenRamme
    return (
      <FetchContainer>
        <Paper
          square={true}
          elevation={4}
          style={{
            position: 'relative',
            top: -72,
          }}
        >
          {props.meta && (
            <Kodekort
              {...props.meta}
              onGoToCode={props.onGoToCode}
              erAktivert={props.erAktivert}
              onToggleLayer={props.onToggleLayer}
              onFitBounds={props.onFitBounds}
              data={props.data}
              language={props.language}
            />
          )}
          <List>
            <F
              ingress={props.meta.ingress}
              antallNaturomrader={props.data.antallNaturomrader}
              antallArter={props.data.antallArter}
            />
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
        </Paper>
      </FetchContainer>
    )
  }
}

export default KodeVindu
