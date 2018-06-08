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
    const { kode } = this.props
    const tekst = this.props.hele ? kode : this.sisteDelAvKoden(kode)
    return (
      <span title={kode} style={styles.chip}>
        {tekst}
      </span>
    )
  }

  sisteDelAvKoden(kode) {
    return typesystem.splittKodeMalestokk(kode).pop()
  }
}

export default muiThemeable()(Kodetagg)
