import React, { Component } from 'react'

function oppsummer(node) {
  let r = {}
  oppsummer2(node, r, 1)
  return r
}

function oppsummer2(node, r, nivå) {
  Object.keys(node).forEach(ckey => {
    switch (ckey) {
      case 'barn':
        Object.keys(node.barn).forEach(kode => {
          oppsummer2(node.barn[kode], r, nivå + 1)
        })
        return
      case 'kode':
        if (node[ckey].length > (r[ckey] ? r[ckey.length] : 0))
          r[ckey] = node[ckey]
        return
      default:
        r[ckey + (nivå > 1 ? nivå : '')] = node[ckey]
        return
    }
  })
}

class FlatUt extends Component {
  render() {
    const { node } = this.props
    const r = oppsummer(node)
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        ...r,
      })
    })
  }

  map(kode, r) {
    return r.verdi.map((v, i) => {
      return <div>{v}</div>
    })
  }
}

export default FlatUt
