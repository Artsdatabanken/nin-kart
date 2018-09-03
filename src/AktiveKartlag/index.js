import { Button, List, ListSubheader, withStyles } from '@material-ui/core'
import { Close, Style } from '@material-ui/icons/'
import React from 'react'
import { withRouter } from 'react-router'
import { SettingsContext } from '../SettingsContext'
import BakgrunnskartElement from './BakgrunnskartElement'
import PolygonlagElement from './PolygonlagElement'
import TerrenglagElement from './TerrenglagElement'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
})

class AktiveKartlag extends React.Component {
  render() {
    const { koder, history, style, classes } = this.props

    return (
      <div style={{ ...style }}>
        <List>
          <ListSubheader>Aktive kartlag</ListSubheader>
          <SettingsContext.Consumer>
            {context => (
              <React.Fragment>
                {koder.map(forelder => {
                  return listeElement(forelder, this.props, context.visKoder)
                })}
                <div style={{ paddxing: 16 }}>
                  <Button
                    variant="outlined"
                    className={classes.button}
                    onClick={() => {
                      history.push('/katalog/')
                    }}
                  >
                    <Style />
                    &nbsp;Åpne katalog
                  </Button>
                  <Button
                    variant="outlined"
                    className={classes.button}
                    onClick={() => {
                      context.onUpdateValue('visAktiveLag', false)
                    }}
                  >
                    Lukk&nbsp;
                    <Close />
                  </Button>
                </div>
              </React.Fragment>
            )}
          </SettingsContext.Consumer>
        </List>
      </div>
    )
  }
}

function finnType(kode) {
  switch (kode) {
    case 'terreng':
      return TerrenglagElement
    case 'bakgrunn':
      return BakgrunnskartElement
    default:
      return PolygonlagElement
  }
}

function listeElement(forelder, props, visKoder) {
  const kode = forelder.kode
  const {
    history,
    onRemoveSelectedLayer,
    onMouseEnter,
    onMouseLeave,
    onUpdateLayerProp,
  } = props
  const subProps = {
    onRemoveSelectedLayer,
    onMouseEnter,
    onMouseLeave,
    onUpdateLayerProp,
  }
  const Type = finnType(kode)
  return (
    <Type
      {...forelder}
      {...subProps}
      key={kode}
      visKoder={visKoder}
      onClick={() => {
        onMouseLeave()
        history.push('/lag/' + kode)
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onRemove={kode => onRemoveSelectedLayer(kode)}
    />
  )
}

export default withStyles(styles)(withRouter(AktiveKartlag))
