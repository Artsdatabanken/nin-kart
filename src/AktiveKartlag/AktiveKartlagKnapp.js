// @flow
import { Paper, IconButton, Toolbar, Typography } from '@material-ui/core'
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
  ikon: { margin: '8px 22px 8px 14px' },
  rot: {
    backgroundColor: 'hsl(0, 0%, 96%)',
    cursor: 'pointer',
    display: 'flex',
    flex: 'none',
    alignItems: 'flex-start',
    color: 'hsla(0, 0%, 0%, 0.54)',
    '&:hover': {
      color: 'hsla(0, 0%, 0%, 0.87)',
    },
  },

  tekst: {
    fontSize: 15,
    fontWeight: 500,
    height: 44,
    lineHeight: '44px',
    textAlign: 'center',
  },
}

class AktiveKartlagKnapp extends React.Component<Props> {
  render() {
    const { onClick, erÅpen, classes } = this.props
    const Ikon = erÅpen ? ExpandMore : ExpandLess
    return (
      <Paper className={classes.rot} onMouseDown={onClick} square={true}>
        <Ikon color="inherit" className={classes.ikon} />
        <Typography color="inherit" className={classes.tekst}>
          Mine kartlag
        </Typography>
      </Paper>
    )
  }
}

export default withStyles(styles)(withRouter(AktiveKartlagKnapp))
