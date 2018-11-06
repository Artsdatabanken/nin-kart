// @flow
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React from 'react'
import { withRouter } from 'react-router'

type Props = {
  erÅpen: PropTypes.Boolean,
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

const styles = {
  toolbar: {
    cursor: 'pointer',
    color: 'hsla(0, 0%, 0%, 0.54)',
    '&:hover': {
      color: 'hsla(0, 0%, 0%, 0.87)',
    },
  },
  ikon: { margin: '8px 22px 8px 14px' },
}

class AktiveKartlagKnapp extends React.Component<Props> {
  render() {
    const { onClick, erÅpen, classes } = this.props
    const Ikon = erÅpen ? ExpandMore : ExpandLess
    return (
      <div
        style={{
          xbackgroundColor: '#fff',
          width: 408,
          xboxShadow:
            '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
        }}
      >
        <AppBar elevation={1} position="static" color="inherit" square={false}>
          <Toolbar
            variant="dense"
            className={classes.toolbar}
            onClick={onClick}
          >
            <Ikon color="inherit" className={classes.ikon} />
            <Typography
              style={{
                flexGrow: 1,
                fontSize: 15,
                fontWeight: 500,
              }}
              variant="h6"
              color="inherit"
            >
              Aktive kartlag
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(withRouter(AktiveKartlagKnapp))
