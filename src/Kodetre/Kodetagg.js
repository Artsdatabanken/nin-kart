import React from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'
import typesystem from '@artsdatabanken/typesystem'

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
    const tekst = this.props.hele ? kode : this.sisteDelAvKoden(kode)
    return <div style={styles.chip}>{tekst}</div>
  }

  sisteDelAvKoden(kode) {
    return typesystem.splittKode(kode).pop()
  }
}

export default muiThemeable()(Kodetagg)
