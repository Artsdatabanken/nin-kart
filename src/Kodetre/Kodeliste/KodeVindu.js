import typesystem from '@artsdatabanken/typesystem'
import { List, ListItemText, ListSubheader, Paper } from '@material-ui/core'
import React from 'react'
import FetchContainer from '../../FetchContainer'
import prettyprint from '../../prettyprint'
import språk from '../../språk'
import Graf from './Graf'
import Kodekort from './Kodekort'
import Kodeliste from './Kodeliste'

const Fakta2 = ({
  tittel,
  toppnavn,
  ingress,
  stats,
  infoUrl,
  arealVindu,
  arterVindu,
  geometrierVindu,
}) => (
  <React.Fragment>
    <ListSubheader>Fakta</ListSubheader>
    <ListItemText>
      <div
        style={{
          fontSize: 13,
          color: 'rgba(0,0,0,0.87)',
          paddingLeft: 16,
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
    {stats.areal && (
      <ListItemText>
        <div
          style={{
            paddingTop: 16,
            fontSize: 13,
            color: 'rgba(0,0,0,0.87)',
            paddingLeft: 16,
          }}
        >
          Det er kartlagt <b>{prettyprint.prettyPrintAreal(stats.areal)}</b>
          &nbsp;med&nbsp;
          {tittel.toLowerCase()}
          .&nbsp;
          {toppnavn && (
            <span>
              Dette utgjør&nbsp;
              <b>{((100 * stats.areal) / stats.arealPrefix).toFixed(1)} %</b> av
              kartlagte&nbsp;
              {toppnavn.toLowerCase()}.
            </span>
          )}
          {stats.arter && (
            <span>
              &nbsp;Det er observert <b>{stats.arter}</b> ulike arter i områder
              som er kartlagt som {tittel.toLowerCase()}.
            </span>
          )}
        </div>
      </ListItemText>
    )}
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
            <Fakta2
              tittel={språk(props.meta.tittel)}
              toppnavn={this.toppnivåNavn(props.meta.overordnet)}
              ingress={props.meta.ingress}
              stats={props.meta.stats || {}}
              arealVindu={999999}
              arterVindu={props.data.antallArter}
              geometrierVindu={props.data.antallNaturomrader}
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

  toppnivåNavn(forfedre) {
    console.log(forfedre)
    if (forfedre.length < 2) return null
    console.log(forfedre[forfedre.length - 2])
    return språk(forfedre[forfedre.length - 2].tittel)
  }
}

export default KodeVindu
