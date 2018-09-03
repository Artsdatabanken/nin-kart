// @flow
import { PropTypes } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import LayersIcon from '@material-ui/icons/Layers'
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
    top: 16,
    right: 16,
  },
}

class AktiveKartlagKnapp extends React.Component<Props, State> {
  render() {
    const { classes, onClick } = this.props
    return (
      <Button
        variant="fab"
        color="primary"
        aria-label="Add"
        className={classes.button}
        onClick={onClick}
      >
        <LayersIcon />
      </Button>
    )
  }
}

export default withStyles(styles)(withRouter(AktiveKartlagKnapp))
