import React from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'

class Kodetagg extends React.Component {
  render() {
    const styles = {
      chip: {
        margin: 2,
        fontSize: 8,
        lineHeight: '10px',
        color: this.props.muiTheme.palette.alternateTextColor,
        fontWeight: 600,
        paddingLeft: '2px',
        paddingRight: '2px',
      },
      wrapper: {
        padding: 2,
        display: 'flex',
        flexWrap: 'wrap',
        height: 16,
        boxSizing: 'border-box',
        marginTop: '2px',
        marginLeft: '0px',
        outline: 'none',
        position: 'relative',
        backgroundColor: this.props.muiTheme.palette.accent3Color,
        borderRadius: '8px',
        width: 'fit-content',
      },
    }
    const { kode } = this.props
    return (
      <div style={styles.wrapper}>
        <div style={styles.chip}>{kode}</div>
      </div>
    )
  }
}

export default muiThemeable()(Kodetagg)
