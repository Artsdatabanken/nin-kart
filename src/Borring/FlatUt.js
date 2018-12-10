import React, { Component } from 'react'

function oppsummer(node) {
  let r = {}
  oppsummer2(node, r, 1)
  return r
}

function oppsummer2(node, r, nivå) {
  Object.keys(node).forEach(ckey => {
    switch (ckey) {
      case 'values':
        Object.keys(node.values).forEach(kode => {
          r.kode = kode
          oppsummer2(node.values[kode], r, nivå + 1)
        })
        return
      default:
        r[ckey + (nivå > 1 ? nivå : '')] = node[ckey]
        return
    }
  })
  console.log(r)
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
