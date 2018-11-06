import React from 'react'
import { withStyles } from '@material-ui/core'
import classNames from 'classnames'

const styles = {
  rot: {
    color: 'hsla(0, 0%, 0%, 0.87)',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    height: '100vh',
    flexDirection: 'column',
    padding: 0,
    width: 408,
    zIndex: -10,
    overflow: 'hidden',
    pointerEvents: 'auto',
  },
  transparent: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    pointerEvents: 'none',
  },
  padTop: { paddingTop: 55 },
}

const Panel = ({ transparent, padTop, classes, style, children }) => (
  <div
    className={classNames(
      classes.rot,
      transparent && classes.transparent,
      padTop && classes.padTop
    )}
  >
    <div
      style={{
        overflowY: 'auto',
      }}
    >
      {children}
    </div>
  </div>
)

export default withStyles(styles)(Panel)
