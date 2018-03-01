import React from 'react'
import Kodekort from './Kodekort'
import StatistikkContainer from '../Statistikk/StatistikkContainer'
import { Paper, List, div, Subheader } from 'material-ui'
import FetchContainer from '../../FetchContainer'
import Kodeliste from './Kodeliste'

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
            />
          )}
          {props.meta.ingress && (
            <div style={{ padding: 16 }}>{props.meta.ingress}</div>
          )}
          {props.meta.bbox && (
            <div style={{ padding: 16 }}>Vis utstrekning i kartet</div>
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
            />

            {false && (
              <React.Fragment>
                <Kodeliste
                  title={`Diagnostiske arter`}
                  apidata={props.data.barn}
                  metadata={props.meta}
                  ekspandertKode={this.state.ekspandertKode}
                  onGoToCode={props.onGoToCode}
                  onMouseEnter={props.onMouseEnter}
                  onMouseLeave={props.onMouseLeave}
                  onUpdateLayerProp={props.onUpdateLayerProp}
                />
              </React.Fragment>
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
