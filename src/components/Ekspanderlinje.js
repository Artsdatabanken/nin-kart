import { withStyles } from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import classNames from 'classnames'
import React from 'react'
import { Paper } from '@material-ui/core'

const styles = {
  hover: {
    color: 'hsl(0, 0%, 0%)',
  },
  hovernot: {
    color: 'hsla(0, 0%, 0%, 0.54)',
  },
  rot: {
    backgroundColor: 'hsl(0, 0%, 96%)',
    cursor: 'pointer',
    height: 44,
    display: 'flex',
    flex: 'none',
    alignItems: 'flex-start',
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
    position: 'absolute',
    bottom: 0,
    boxShadow: '0 -2px 4px rgba(0,0,0,.2)',
  },
  closed: {
    marginLeft: 8,
    marginRight: 8,
    width: 392,
    boxShadow: 'hsla(0, 0%, 0%, 0.3) 0px 2px 4px 0px',
    marginBottom: 8,
  },
}

class Ekspanderlinje extends React.Component {
  handleMouseEnter = () => this.setState({ hover: true })
  handleMouseLeave = () => this.setState({ hover: false })
  state = { hover: false }

  render() {
    const { classes, mode, onSkjul, tekst } = this.props
    const Ikon = mode === 'open' ? ExpandLess : ExpandMore
    return (
      <Paper
        className={classNames(
          classes.rot,
          mode && classes[mode],
          this.state.hover ? classes.hover : classes.hovernot
        )}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseDown={onSkjul}
      >
        <Ikon className={classes.ikon} />
        <div className={classes.tekst}>{tekst}</div>
      </Paper>
    )
  }
}
export default withStyles(styles)(Ekspanderlinje)
