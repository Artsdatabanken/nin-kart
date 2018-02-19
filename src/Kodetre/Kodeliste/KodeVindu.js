import React from 'react'
import Kodekort from './Kodekort'
import StatistikkContainer from '../Statistikk/StatistikkContainer'
import { Paper, List, div, Subheader } from 'material-ui'
import FetchContainer from '../../FetchContainer'
import ColorPicker from './ColorPicker'
import tinycolor from 'tinycolor2'
import Kodeliste from './Kodeliste'

class KodeVindu extends React.Component {
  handleShowColorpicker = kode => {
    this.setState({ colorPicker: kode })
  }
  state = {}

  render() {
    const props = this.props
    const selv = props.meta.selv || {}
    const navn = (selv.navn || props.data.navn || ' type').toLowerCase() // TODO: navn i meta
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
          {props.meta.ingress && <div primaryText={props.meta.ingress} />}
          <List>
            {this.state.colorPicker && (
              <ColorPicker
                color={props.meta.barn[this.state.colorPicker].color}
                onChange={color =>
                  props.onUpdateLayerProp(
                    this.state.colorPicker,
                    'color',
                    tinycolor(color.rgb).toRgbString()
                  )
                }
                onChangeComplete={color =>
                  props.onUpdateLayerProp(
                    this.state.colorPicker,
                    'color',
                    tinycolor(color.rgb).toRgbString()
                  )
                }
              />
            )}

            <Kodeliste
              title={`Undernivåer av ${navn}`}
              apidata={props.data.barn}
              metadata={props.meta.barn}
              onGoToCode={props.onGoToCode}
              onMouseEnter={props.onMouseEnter}
              onMouseLeave={props.onMouseLeave}
              onShowColorpicker={this.handleShowColorpicker}
            />

            {false && (
              <React.Fragment>
                <Kodeliste
                  title={`Diagnostiske arter`}
                  apidata={props.data.barn}
                  metadata={props.meta}
                  onGoToCode={props.onGoToCode}
                  onMouseEnter={props.onMouseEnter}
                  onMouseLeave={props.onMouseLeave}
                />
              </React.Fragment>
            )}
            {false && (
              <React.Fragment>
                <Subheader>Om {navn}</Subheader>
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
