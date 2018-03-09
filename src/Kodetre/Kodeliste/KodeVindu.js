import React from 'react'
import Kodekort from './Kodekort'
import StatistikkContainer from '../Statistikk/StatistikkContainer'
import { Paper, List, div, Subheader } from 'material-ui'
import FetchContainer from '../../FetchContainer'
import Kodeliste from './Kodeliste'
import { RaisedButton } from 'material-ui'

class KodeVindu extends React.Component {
  handleShowColorpicker = kode => {
    const nyKode = this.state.ekspandertKode === kode ? null : kode
    this.setState({ ekspandertKode: nyKode })
  }
  state = {}

  render() {
    const props = this.props
    const selv = props.meta.selv || {}
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
              data={props.data}
              language={props.language}
            />
          )}
          {props.meta.ingress && (
            <div style={{ padding: 16 }}>{props.meta.ingress}</div>
          )}
          {props.meta.bbox && (
            <div style={{ margin: 8 }}>
              <RaisedButton
                primary
                onClick={() =>
                  props.handleFitBounds(
                    props.meta.bbox ? props.meta.bbox : undefined
                  )
                }
              >
                Vis i kart
              </RaisedButton>
            </div>
          )}
          <List>
            <Kodeliste
              title={`Inneholder`}
              apidata={props.data ? props.data.barn : []}
              metadata={props.meta.barn}
              ekspandertKode={this.state.ekspandertKode}
              onGoToCode={props.onGoToCode}
              onMouseEnter={props.onMouseEnter}
              onMouseLeave={props.onMouseLeave}
              onShowColorpicker={this.handleShowColorpicker}
              onUpdateLayerProp={props.onUpdateLayerProp}
              language={props.language}
            />

            {props.meta &&
              props.meta.relasjon &&
              props.meta.relasjon.mengdeart && (
                <Kodeliste
                  title={`Mengdearter`}
                  subtitle={`Art med gjennomsnittlig dekning eller biomasseandel større enn 1/8 i et utvalg av enkeltobservasjonsenheter.`}
                  apidata={props.data ? props.data.barn : []}
                  metadata={props.meta.relasjon.mengdeart}
                  ekspandertKode={this.state.ekspandertKode}
                  onGoToCode={props.onGoToCode}
                  onMouseEnter={props.onMouseEnter}
                  onMouseLeave={props.onMouseLeave}
                  onUpdateLayerProp={props.onUpdateLayerProp}
                />
              )}

            {props.meta &&
              props.meta.relasjon &&
              props.meta.relasjon.tyngdepunktart && (
                <Kodeliste
                  title={`Tyngdepunktarter`}
                  subtitle={`Art med høyere frekvens og dekning i en aktuell naturtype (hovedtype eller grunntype) enn i et sammenliknbart utvalg typer
                  (f.eks. andre hovedtyper som tilhører samme hovedtypegruppe eller andre grunntyper som tilhører samme hovedtype`}
                  apidata={props.data ? props.data.barn : []}
                  metadata={props.meta.relasjon.tyngdepunktart}
                  ekspandertKode={this.state.ekspandertKode}
                  onGoToCode={props.onGoToCode}
                  onMouseEnter={props.onMouseEnter}
                  onMouseLeave={props.onMouseLeave}
                  onUpdateLayerProp={props.onUpdateLayerProp}
                />
              )}

            {false && (
              <React.Fragment>
                <Subheader>Om {selv.tittel}</Subheader>
                <StatistikkContainer
                  ingress={props.meta.ingress}
                  dataUrl={'/kode/' + props.data.kode}
                />
              </React.Fragment>
            )}
          </List>
        </Paper>
      </FetchContainer>
    )
  }
}

export default KodeVindu
