import { Typography, withStyles } from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import classNames from 'classnames'
import React from 'react'
import { Paper } from '@material-ui/core'

const styles = {
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
    pointerEvents: 'auto',
  },
  ikon: { margin: '8px 22px 8px 14px' },
  tekst: {
    fontSize: 15,
    fontWeight: 500,
    height: 44,
    lineHeight: '44px',
    textAlign: 'center',
  },
  open: {
    width: 408,
    boxShadow: '0 -2px 4px rgba(0,0,0,.2)',
  },
  closed: {
    width: 392,
    marginBottom: 8,
  },
  div: {
    justifyContent: 'flex-end',
    float: 'bottom',
  },
}

class Ekspanderlinje extends React.Component {
  render() {
    const { classes, mode, onSkjul, tekst } = this.props
    const erÅpen = mode === 'open'
    const Ikon = erÅpen ? ExpandLess : ExpandMore
    return (
      <div className={classes.div}>
        <Paper
          square={erÅpen}
          className={classNames(classes.rot, mode && classes[mode])}
          onMouseDown={onSkjul}
        >
          <Ikon className={classes.ikon} />
          <Typography color="inherit" className={classes.tekst}>
            {tekst}
          </Typography>
        </Paper>
      </div>
    )
  }
}
export default withStyles(styles)(Ekspanderlinje)
