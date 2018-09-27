import { withStyles } from '@material-ui/core'
import { ExpandLess } from '@material-ui/icons'
import classNames from 'classnames'
import React from 'react'

const styles = {
  hover: {
    color: 'hsl(0, 0%, 0%)',
  },
  hovernot: {
    color: 'hsla(0, 0%, 0%, 0.54)',
  },
  rot: {
    backgroundColor: 'hsl(0, 0%, 96%)',
    boxShadow: '0 -2px 4px rgba(0,0,0,.2)',
    cursor: 'pointer',
    position: 'absolute',
    width: '100%',
    height: 44,
    bottom: 0,
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
}

class Ekspanderlinje extends React.Component {
  handleMouseEnter = () => this.setState({ hover: true })
  handleMouseLeave = () => this.setState({ hover: false })
  state = { hover: false }

  render() {
    const { classes, onSkjul } = this.props
    return (
      <div
        className={classNames(
          classes.rot,
          this.state.hover ? classes.hover : classes.hovernot
        )}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={onSkjul}
      >
        <ExpandLess className={classes.ikon} />
        <div className={classes.tekst}>Skjul</div>
      </div>
    )
  }
}
export default withStyles(styles)(Ekspanderlinje)
