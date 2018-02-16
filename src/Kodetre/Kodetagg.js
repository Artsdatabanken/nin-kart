import React from 'react'

const styles = {
  chip: {
    margin: 2,
    fontSize: 8,
    lineHeight: 12,
    color: 'rgba(95, 95, 95, 0.87)',
    fontWeight: 400,
    paddingLeft: '12px',
    paddingRight: '12px',
    userSelect: 'none',
    whiteSpace: 'nowrap',
  },
  wrapper: {
    padding: 2,
    display: 'flex',
    flexWrap: 'wrap',
    height: 18,
    marginLeft: '12px',
    paddingLeft: '6px',
    paddingRight: '6px',

    border: '10px',
    boxSizing: 'border-box',
    WebkiTapHighlightColor: 'rgba(0, 0, 0, 0)',
    cursor: 'default',
    textDecoration: 'none',
    margin: '0px',
    outline: 'none',
    fontSize: '10px',
    fontWeight: 'inherit',
    position: 'relative',
    backgroundColor: 'rgb(224, 224, 224)',
    borderRadius: '16px',
    whiteSpace: 'nowrap',
    width: 'fit-content',
  },
}

class Kodetagg extends React.Component {
  render() {
    const { kode } = this.props
    return (
      <div style={styles.wrapper}>
        <div styles={styles.chip}>{kode}</div>
      </div>
    )
  }
}

export default Kodetagg
