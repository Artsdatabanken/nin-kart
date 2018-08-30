import { ListItem, ListItemText, ListSubheader } from '@material-ui/core'
import { withTheme } from '@material-ui/core/styles'
import React, { Component } from 'react'
import { withRouter } from 'react-router'

class Borring extends Component {
  render() {
    const { innhold } = this.props
    return (
      <React.Fragment>
        <ListSubheader>_tittel_</ListSubheader>
        {Object.keys(innhold).map(kode => {
          const node = innhold[kode]
          return (
            <ListItem button={true}>
              <ListItemText primary={oppsummer(node)} secondary={node.tittel} />
            </ListItem>
          )
        })}
      </React.Fragment>
    )
  }
}

function oppsummer(node) {
  return Object.keys(node.barn)
    .map(kode => node.barn[kode].tittel)
    .join(', ')
}

export default withRouter(withTheme()(Borring))
