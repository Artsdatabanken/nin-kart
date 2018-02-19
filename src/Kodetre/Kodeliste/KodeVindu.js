import React from 'react'
import Kodelisteelement from './Kodelisteelement'
import Kodekort from './Kodekort'
import StatistikkContainer from '../Statistikk/StatistikkContainer'
import { Paper, List, ListItem, Subheader } from 'material-ui'
import FetchContainer from '../../FetchContainer'
import { ChromePicker } from 'react-color'
import tinycolor from 'tinycolor2'

class KodeVindu extends React.Component {
  handleShowColorpicker = kode => {
    this.setState({ colorPicker: kode })
  }
  state = {}

  render() {
    const props = this.props
    console.log(props)
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
          {props.meta.ingress && <ListItem primaryText={props.meta.ingress} />}

          <List>
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
          {this.state.colorPicker && (
            <ChromePicker
              color={props.meta.barn[this.state.colorPicker].color}
              onChangeComplete={color =>
                props.onUpdateLayerProp(
                  this.state.colorPicker,
                  'color',
                  tinycolor(color.rgb).toRgbString()
                )
              }
            />
          )}
        </Paper>
      </FetchContainer>
    )
  }
}

const Kodeliste = ({
  title,
  apidata,
  metadata,
  onGoToCode,
  onMouseEnter,
  onMouseLeave,
  onShowColorpicker,
  onUpdateLayerProp,
}) => {
  if (!metadata) return null
  return (
    <React.Fragment>
      <Subheader>{title}</Subheader>
      {Object.keys(metadata).map(item => {
        const apibarn = apidata
          ? apidata[
              apidata
                .map(apiItem => {
                  return apiItem.kode
                })
                .indexOf(item)
            ] || {}
          : {}
        const metabarnet = metadata[item] || {}
        const kode = item.toString()
        return (
          <Kodelisteelement
            kode={kode}
            key={kode}
            {...apibarn}
            meta={metabarnet}
            onGoToCode={onGoToCode}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onUpdateLayerProp={onUpdateLayerProp}
            onShowColorpicker={() => onShowColorpicker(kode)}
          />
        )
      })}
    </React.Fragment>
  )
}

export default KodeVindu
