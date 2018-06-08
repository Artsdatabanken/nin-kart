import { Divider, RaisedButton, Subheader } from 'material-ui'
import MapsLayers from 'material-ui/svg-icons/maps/layers'
import React from 'react'
import { withRouter } from 'react-router'
import BakgrunnskartElement from './BakgrunnskartElement'
import PolygonlagElement from './PolygonlagElement'
import TerrenglagElement from './TerrenglagElement'
import Collapsible from 'react-collapsible'
import HardwareKeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import HardwareKeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up'

class AktiveKartlag extends React.Component {
  render() {
    const {
      koder,
      onRemoveSelectedLayer,
      onMouseEnter,
      onMouseLeave,
      onToggleVisible,
      language,
      history,
    } = this.props

    koder.map(forelder => {
      forelder.barnArray = []
      if (forelder.barn) {
        Object.keys(forelder.barn).forEach(kode => {
          const item = forelder.barn[kode]
          item.kode = kode
          forelder.barnArray.push(item)
        })
      }
      return null
    })

    return (
      <div style={{ position: 'relative', top: 8 }}>
        <Subheader>Mine kartlag</Subheader>
        <Divider />
        {koder.map(forelder => {
          const kode = forelder.kode
          return (
            <React.Fragment key={kode}>
              <Collapsible
                open={true}
                trigger={
                  <PolygonlagElement
                    {...forelder}
                    key={kode}
                    kode={kode}
                    vis={forelder.vis}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onRemove={kode => onRemoveSelectedLayer(kode)}
                    onToggleVisible={onToggleVisible}
                    language={language}
                    rightIcon={<HardwareKeyboardArrowDown />}
                  />
                }
                triggerWhenOpen={
                  <PolygonlagElement
                    {...forelder}
                    key={kode}
                    kode={kode}
                    vis={forelder.vis}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onRemove={kode => onRemoveSelectedLayer(kode)}
                    onClick={() => this.handleClick(kode)}
                    onToggleVisible={onToggleVisible}
                    language={language}
                    rightIcon={<HardwareKeyboardArrowUp />}
                  />
                }
                easing="ease-in-out"
              >
                {forelder.barnArray.map(item => {
                  const kode = item.kode
                  return (
                    <PolygonlagElement
                      {...item}
                      key={kode}
                      kode={kode}
                      vis={item.vis}
                      onMouseEnter={onMouseEnter}
                      onMouseLeave={onMouseLeave}
                      onRemove={kode => onRemoveSelectedLayer(kode)}
                      onClick={() => this.handleClick(kode)}
                      onToggleVisible={onToggleVisible}
                      language={language}
                      indent={15}
                    />
                  )
                })}
              </Collapsible>
            </React.Fragment>
          )
        })}
        <BakgrunnskartElement
          key="basemap"
          kode="Mørk grå"
          meta={{ tittel: { nb: 'Bakgrunnskart' } }}
          vis={true}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onRemove={kode => onRemoveSelectedLayer('basemap')}
          onClick={() => this.handleClick('basemap')}
          onToggleVisible={kode => onToggleVisible(kode)}
          language={language}
        />
        <TerrenglagElement
          key="terreng"
          meta={{ tittel: { nb: '3D terreng' } }}
          vis={true}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onRemove={kode => onRemoveSelectedLayer('terreng')}
          onClick={() => this.handleClick('terreng')}
          onToggleVisible={kode => onToggleVisible(kode)}
          language={language}
        />
        <RaisedButton
          icon={<MapsLayers />}
          label="Katalog"
          primary
          style={{ margin: 16, float: 'right' }}
          onClick={() => {
            history.push('/katalog/')
            this.props.visKatalog()
          }}
        />
      </div>
    )
  }
}
export default withRouter(AktiveKartlag)
