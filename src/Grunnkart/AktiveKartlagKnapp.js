// @flow
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { ExpandLess } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React from 'react'
import { withRouter } from 'react-router'

type State = {}

type Props = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

const styles = {
  button: {
    position: 'absolute',
    bottom: 28,
    right: 52,
  },
}

class AktiveKartlagKnapp extends React.Component<Props, State> {
  render() {
    const { onClick } = this.props
    return (
      <div
        style={{
          backgroundColor: '#fff',
          position: 'absolute',
          width: 208,
          right: 0,
          bottom: 0,
          height: 44,
          boxShadow:
            '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
        }}
      >
        <AppBar position="static" color="inherit" square={false}>
          <Toolbar
            variant="dense"
            style={{
              paddingRight: 0,
              color: 'hsla(0, 0%, 0%, 0.54)',
              cursor: 'pointer',
            }}
            onClick={onClick}
          >
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
            <IconButton color="inherit">
              <ExpandLess />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(withRouter(AktiveKartlagKnapp))
