import { Typography, withStyles } from '@material-ui/core'
import { ExpandLess } from '@material-ui/icons'
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
  ikon: {
    margin: '8px 22px 8px 14px',
    transition: '0.5s',
  },
  ikonÅpen: {
    transform: 'rotate(0deg)',
  },
  ikonLukket: {
    transform: 'rotate(180deg)',
  },
  tekst: {
    fontSize: 15,
    fontWeight: 500,
    height: 44,
    lineHeight: '44px',
    textAlign: 'center',
  },
  åpen: {
    width: 392,
  },
  lukket: {
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
    const { classes, erÅpen, onSkjul, tekst } = this.props
    return (
      <div className={classes.div}>
        <Paper
          square={erÅpen}
          className={classNames(
            classes.rot,
            erÅpen ? classes.åpen : classes.lukket
          )}
          onMouseDown={onSkjul}
        >
          <ExpandLess
            color="inherit"
            className={classNames(
              classes.ikon,
              erÅpen ? classes.ikonÅpen : classes.ikonLukket
            )}
          />
          <Typography color="inherit" className={classes.tekst}>
            {tekst}
          </Typography>
        </Paper>
      </div>
    )
  }
}
export default withStyles(styles)(Ekspanderlinje)
