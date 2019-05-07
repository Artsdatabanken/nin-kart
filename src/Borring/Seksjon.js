import React, { Component } from "react";
import ListeLink from "./ListeLink";

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
    const { node, kode, visKoder, kategori, onClick, new_object } = this.props;
    const oppsumert_node = oppsummer(node);
    const secondary = oppsumert_node.map(e => this.map(e.verdi));

    return (
      <ListeLink
        new_object={new_object}
        key={kode}
        kode={kode}
        secondary={secondary}
        primary={kategori}
        visKoder={visKoder}
        onClick={onClick}
      />
    );
  }

  map(oppsumert_node) {
    const len = oppsumert_node.length;
    const value = oppsumert_node[len - 1];
    if (len < 2)
      return (
        <div key={value} className="sidebar_padding">
          <h4 className="entallsSjekk">{entallsSjekk(value)}</h4>
        </div>
      );

    const key = oppsumert_node[len - 2];
    return (
      <div key={value} className="sidebar_padding">
        <h4> {entallsSjekk(key.trim())}</h4>
        <h5 className="sub_sub_heading">{replaceString(value)}</h5>
      </div>
    );
  }
}

function entallsSjekk(verdi) {
  switch (verdi) {
    case "Bioklimatiske soner":
      return "Bioklimatisk sone";
    case "Bioklimatiske seksjoner":
      return "Bioklimatisk seksjon";
    default:
      return verdi;
  }
}

function replaceString(verdi) {
  let string_to_replace = " dekning";
  switch (verdi) {
    case "0":
      return "ingen";
    default:
      return verdi.replace(string_to_replace, "");
  }
}

export default Seksjon;
