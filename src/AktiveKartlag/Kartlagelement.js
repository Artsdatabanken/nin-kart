import { Divider, ListItem } from 'material-ui'
import Toggle from 'material-ui/Toggle'
import muiThemeable from 'material-ui/styles/muiThemeable'
import Reorder from 'material-ui/svg-icons/action/reorder'
import React from 'react'
import { withRouter } from 'react-router'
import PaintSwatch from '../Kodetre/Kodeliste/PaintSwatch'

class Kartlagelement extends React.Component {
  render() {
    const item = this.props
    const { tittel, undertittel, kode, farge, kanFlyttes = true } = this.props
    return (
      <React.Fragment>
        <ListItem
          key={item.kode}
          onMouseEnter={() =>
            this.props.onMouseEnter && this.props.onMouseEnter(kode)
          }
          onMouseLeave={() => {
            this.props.onMouseLeave && this.props.onMouseLeave(kode)
          }}
          leftAvatar={
            <div onClick={() => this.props.history.push('/lag/' + kode)}>
              {this.props.onToggleVisible && (
                <div
                  style={{
                    display: 'inline-flex',
                    position: 'absolute',
                    right: 40,
                    top: 8,
                  }}
                >
                  <Toggle
                    toggled={this.props.vis}
                    onClick={e => {
                      e.stopPropagation()
                      this.props.onToggleVisible(item.kode)
                    }}
                  />
                </div>
              )}
              <div
                style={{
                  display: 'inline-flex',
                  position: 'absolute',
                  top: 8,
                  left: this.props.indent || 0,
                }}
              >
                <PaintSwatch farge={farge} />
              </div>
            </div>
          }
          primaryText={<div style={{ paddingRight: 35 }}>{tittel}</div>}
          secondaryText={undertittel}
          rightIcon={this.props.rightIcon}
          rightAvatar={
            !this.props.rightIcon && kanFlyttes ? (
              <div
                style={{ cursor: '-webkit-grab', marginTop: 8, marginLeft: 8 }}
              >
                <Reorder
                  style={{ color: this.props.muiTheme.palette.disabledColor }}
                />
              </div>
            ) : null
          }
        >
          <div style={{ position: 'absolute', left: 280, top: 24 }}>
            <Toggle
              toggled={this.props.vis}
              onClick={e => {
                e.stopPropagation()
                this.props.onToggleVisible(kode)
              }}
            />
          </div>
        </ListItem>
        <Divider />
      </React.Fragment>
    )
  }
}

export default withRouter(muiThemeable()(Kartlagelement))
