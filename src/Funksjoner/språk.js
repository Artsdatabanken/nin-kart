import {exportableSpraak} from "App";



export default function språk(meta) {
  let spraak = exportableSpraak.state.spraak;  

  if (!meta) return "";
  if (typeof meta === "string") return meta;
  const keys = Object.keys(meta);  

  if (!keys || keys.length === 0) return meta;

  if (keys.length === 1) return meta[keys[0]];

  //if (meta.la) return `${meta.nb} (${meta.la})`;
  if (spraak === "nb") return `${meta.nb}`;
  if (spraak === "la"){    
    if (!meta.la){
      return `${meta.nb}`;
    } else {
    return `${meta.la}`;
    }
  }
  if (spraak === "nn"){    
    if (!meta.nn){
      return `${meta.nb}`;
    } else {
    return `${meta.nn}`;
    }
  }
  if (spraak === "en") {    
    if (!meta.en){
      return `${meta.nb}`;
    } else {
    return `${meta.en}`;
    }
  }
  
    
  return meta[keys[0]];
}
