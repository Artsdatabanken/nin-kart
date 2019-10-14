import {exportableSpraak} from "App";

export default function språk(meta) {
  let spraak = exportableSpraak.state.spraak;  
  if (!meta) return "";
  if (typeof meta === "string") return meta;
  const keys = Object.keys(meta);  
  if (!keys || keys.length === 0) return meta;
  if (keys.length === 1) return meta[keys[0]];
  if(meta[spraak] && meta[spraak] !== undefined){
    return meta[spraak];
  }else if(meta.nb){
    return `${meta.nb}`;
  } else if (meta.nb === "undefined" && meta.sn !== undefined) {
    return `${meta.sn}`;
  }   
  return meta[keys[0]];
}