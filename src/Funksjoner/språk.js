import {exportableSpraak} from "App";



export default function språk(meta) {
  let spraak = exportableSpraak.state.spraak;  
  console.log(spraak);

  if (!meta) return "";
  if (typeof meta === "string") return meta;
  const keys = Object.keys(meta);  

  if (!keys || keys.length === 0) return meta;

  if (keys.length === 1) return meta[keys[0]];

  //if (meta.la) return `${meta.nb} (${meta.la})`;
  if (spraak === "nb") return `${meta.nb}`;
  if (spraak === "la") return `${meta.la}`;
  if (spraak === "en") return `${meta.en}`;
  
  return meta[keys[0]];
}
