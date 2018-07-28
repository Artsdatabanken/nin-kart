import typesystem from '@artsdatabanken/typesystem'
import { withTheme } from '@material-ui/core/styles'
import React from 'react'

class Kodetagg extends React.Component {
  render() {
    const { kode } = this.props
    const styles = {
      chip: {
        fontWeight: 600,
        paddingLeft: '2px',
        paddingRight: '4px',
        float: 'left',
        color: this.props.theme.palette.secondary.main,
      },
    }
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

export default withTheme()(Kodetagg)
