import {
  AppBar,
  Button,
  IconButton,
  List,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import { Style } from '@material-ui/icons/'
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
    const { koder, classes } = this.props

    return (
      <SettingsContext.Consumer>
        {context => (
          <React.Fragment>
            <AppBar position="static" color="primary">
              <Toolbar
                variant="dense"
                style={{ paddingRight: 0, cursor: 'pointer' }}
                onClick={context.onToggleAktiveLag}
              >
                <Typography
                  style={{ flexGrow: 1 }}
                  variant="title"
                  color="inherit"
                >
                  Aktive kartlag
                </Typography>
                <IconButton color="inherit">
                  <ExpandMore />
                </IconButton>
              </Toolbar>
            </AppBar>
            <List>
              <React.Fragment>
                {koder.map(forelder => {
                  return listeElement(forelder, this.props, context.visKoder)
                })}
                <div>
                  <Button
                    variant="outlined"
                    className={classes.button}
                    onClick={this.handleClickKatalog}
                  >
                    <Style />
                    &nbsp;Katalog
                  </Button>
                </div>
              </React.Fragment>
            </List>
          </React.Fragment>
        )}
      </SettingsContext.Consumer>
    )
  }

  handleClickKatalog = () => this.props.history.push('/katalog/')
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
