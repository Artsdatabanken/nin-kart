import React, { Component } from "react";
import Listeelement from "./Listeelement";

function oppsummer(node) {
  let r = [];
  if (!node) return r;
  if (node.values)
    Object.keys(node.values).forEach(kode => {
      let e = [];
      let stack = {};
      oppsummer2(node.values[kode], stack, e, kode);
      r.push(...e);
    });
  else r.push({ verdi: [node.title] });
  return r;
}

function oppsummer2(node, stack1, r, pkode) {
  const stack = Object.assign({}, stack1);
  stack.kode = Object.assign([], stack1.kode);
  stack.verdi = Object.assign([], stack1.verdi);
  if (!stack.verdi) stack.verdi = [];
  if (!stack.kode) stack.kode = [];
  if (node.title) stack.verdi.push(node.title);
  if (node.fraction && node.fraction !== 10)
    stack.verdi.push(node.fraction * 10 + "%");
  stack.kode.push(pkode);
  stack.geom_id = stack.geom_id || node.geom_id;
  if (node.values) {
    Object.keys(node.values).forEach(kode => {
      oppsummer2(node.values[kode], stack, r, kode);
    });
  } else {
    r.push(stack);
  }
}

class Seksjon extends Component {
  render() {
    const { node, kode, visKoder, kategori, onClick } = this.props;
    const r = oppsummer(node);
    const secondary = r.map(e => this.map(e.verdi));

    return (
      <Listeelement
        key={kode}
        kode={kode}
        secondary={secondary}
        primary={kategori}
        visKoder={visKoder}
        onClick={onClick}
      />
    );
  }

  map(r) {
    const len = r.length;
    const value = r[len - 1];
    if (len < 2) return <p className="hack1">{hack1(value)}</p>;
    const key = r[len - 2];
    return (
      <p className="hack2">
        {hack1(key.trim())}: <b>{hack2(value)}</b>
      </p>
    );
  }
}

function hack1(s) {
  switch (s) {
    case "Bioklimatiske soner":
      return "Bioklimatisk sone";
    case "Bioklimatiske seksjoner":
      return "Bioklimatisk seksjon";
    default:
      return s;
  }
}
function hack2(s) {
  switch (s) {
    case "0":
      return "ingen";
    default:
      return s.replace(" dekning", "");
  }
}

export default Seksjon;
