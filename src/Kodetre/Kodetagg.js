import React from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'

class Kodetagg extends React.Component {
  render() {
    const styles = {
      chip: {
        fontWeight: 600,
        paddingLeft: '2px',
        paddingRight: '4px',
        float: 'left',
        color: this.props.muiTheme.palette.accentColor2,
      },
    }
    const { kode, hele } = this.props
    if (hele) return <div style={styles.chip}>{kode}</div>
    return <div style={styles.chip}>{this.sisteDelAvKoden(kode)}</div>
  }

  sisteDelAvKoden(kode) {
    //console.warn(kode)
    return kode ? kode.match(/[A-Z]+|[_-]|[^A-Z]+/gi).pop() : ''
  }
}

export default muiThemeable()(Kodetagg)
