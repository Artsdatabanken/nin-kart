import prettyprint from "Funksjoner/prettyprint";
import språk from "Funksjoner/språk";

const prosent = (over, under) => ((100 * over) / under).toFixed(1) + " %";

export default function tekst(props) {
  const { prefiks, overordnet, areal, arter, tittel } = props;
  switch (prefiks) {
    case "NA":
    case "LA":
      const topp = overordnet[overordnet.length - 2];
      const utgjør = topp
        ? `Dette utgjør ${prosent(areal, topp.areal)} av kartlagte ${språk(
            topp.tittel
          ).toLowerCase()}.`
        : "";
      return `Det er kartlagt ${prettyprint.prettyPrintAreal(
        areal
      )} ${tittel.toLowerCase()}. ${utgjør} Det er observert ${arter} i områder som er kartlagt som ${tittel.toLowerCase()}.`;
    case "VV":
      const mor = overordnet[0] || {};
      const morareal = mor.areal;
      return `${tittel} er ${prettyprint.prettyPrintAreal(areal)}. ${
        morareal
          ? `Dette utgjør ${prosent(
              areal,
              morareal
            )} av vernet areal i Norge inkludert Svalbard og Jan Mayen.`
          : ""
      } Det er observert ${arter} i ${tittel}.`;
    default:
      return null;
  }
}
