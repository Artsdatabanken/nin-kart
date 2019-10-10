import {exportableSpraak} from "App";

export default function språk(meta) {
  let spraak = exportableSpraak.state.spraak;  
  if (!meta) return "";
  if (typeof meta === "string") return meta;
  const keys = Object.keys(meta);  
  if (!keys || keys.length === 0) return meta;
  if (keys.length === 1) return meta[keys[0]];
  if (spraak === "nb" && meta.nb) {
    return `${meta.nb}`;
  } else if (spraak === "sn" && meta.sn){    
    return `${meta.sn}`;
  } else if (spraak === "en" && meta.en) {    
    return `${meta.en}`;  
  } else if (spraak === "nn" && meta.nn) {    
    return `${meta.nn}`;  
  } else if(meta.nb){
    return `${meta.nb}`;
  } else if (meta.nb === "undefined") {
    return `${meta.sn}`;
  }   
  return meta[keys[0]];
}