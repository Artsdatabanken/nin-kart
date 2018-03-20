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
    const { kode } = this.props
    const prefiks = kode.substring(0, 2)
    if ('NA,MI'.indexOf(prefiks) < 0) return null
    return <div style={styles.chip}>{this.sisteDelAvKoden(kode)}</div>
  }

  sisteDelAvKoden(kode) {
    const sub = kode.substring(3)
    let i = sub.length - 1
    for (; i >= 0; i--) {
      if (this.isLetter(sub[i])) break
    }
    return sub.substring(i)
  }

  isLetter = c => c.toLowerCase() !== c.toUpperCase()
}

export default muiThemeable()(Kodetagg)
