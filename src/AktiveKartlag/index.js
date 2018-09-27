import {
  AppBar,
  IconButton,
  List,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
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
  toolbar: {
    paddingRight: 0,
    cursor: 'pointer',
  },
  tekst: {
    flexGrow: 1,
  },
})

class AktiveKartlag extends React.Component {
  render() {
    const { koder, classes } = this.props

    return (
      <SettingsContext.Consumer>
        {context => (
          <React.Fragment>
            <AppBar position="static" color="inherit" square={false}>
              <Toolbar
                variant="dense"
                className={classes.toolbar}
                onClick={context.onToggleAktiveLag}
              >
                <Typography
                  className={classes.tekst}
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
              </React.Fragment>
            </List>
          </React.Fragment>
        )}
      </SettingsContext.Consumer>
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
