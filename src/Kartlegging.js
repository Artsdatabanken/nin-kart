import React from "react";
import { withRouter } from "react-router";
import LukkbartVindu from "./LukkbartVindu";
import {
  Grid,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import Prettyprint from "./Funksjoner/prettyprint";

const Kartlegging = ({ punkt, onClose, onNavigateToTab }) => {
  const [expanded, setExpanded] = React.useState();
  if (!punkt) return null;
  const nat =
    punkt.vektor &&
    Object.values(punkt.vektor).filter((e) => e.datasettkode === "NAT");
  if (nat.length === 0) return null;

  const kartleggings = nat.map((natElement) => {
    const na = natElement.data;
    if (!na) return null;
    const k0 = na.kartleggingsenhet[0] || {};
    const heading = {
      områdeid: k0.område5kid || k0.område20kid || k0.naturtypeid,
      guid: k0.område5kguid || k0.område20kguid || k0.naturtypeguid,
    };
    return (
      <div>
        <div style={{ margin: 24 }}>
          <Table keys={Object.keys(heading)} data={heading} />
        </div>
        <Expa
          expanded={expanded}
          id="prosjekt"
          onChange={setExpanded}
          summary="Prosjekt"
          details={<Prosjekt prosjekt={na.prosjekt} />}
        />
        {na.prosjekt && na.prosjekt.program && (
          <Expa
            expanded={expanded}
            id="program"
            onChange={setExpanded}
            summary="Program"
            details={<Program program={na.prosjekt.program} />}
          />
        )}

        {(na.kartleggingsenhet || []).map((kle) => (
          <Expa
            expanded={expanded}
            id={
              kle.kartleggingsenhet5kid ||
              kle.kartleggingsenhet20kid ||
              kle.kartleggingsenhetntid
            }
            onChange={setExpanded}
            summary={"Kartleggingsenhet " + kle.altkode}
            details={<Kartleggingsenhet kle={kle} />}
          />
        ))}
      </div>
    );
  });

  return (
    <LukkbartVindu
      onBack={() => onNavigateToTab("punkt")}
      onClose={onClose}
      tittel={"Natursystem: Kartlegging"}
    >
      {kartleggings}
    </LukkbartVindu>
  );
};

const Expa = ({ id, expanded, summary, details, onChange }) => (
  <Accordion square expanded={expanded === id} onChange={() => onChange(id)}>
    <AccordionSummary>
      <Typography
        style={{
          fontWeight: 500,
          _fontSize: "1.2rem",
          color: "rgba(0,0,0,0.54)",
        }}
      >
        {summary}
      </Typography>
    </AccordionSummary>
    <AccordionDetails>{details}</AccordionDetails>
  </Accordion>
);

const Kartleggingsenhet = ({ kle }) => {
  const bruker = kle.bruker || {};
  const variabler = kle.variabler || [];
  const data = {
    Kode: [kle.altkode],
    Navn: kle.tittel.nb,
    Andel: kle.andel * 10 + " %",
    "Kartlagt dato": kle.kartlagtdato,
    Merknad: kle.merknad,
    Firmanavn: bruker.firmanavn,
    "Kartleggingsenhet Id":
      kle.kartleggingsenhet5kid ||
      kle.kartleggingsenhet20kid ||
      kle.kartleggingsenhetntid,
    "": "",
    Variabler: "",
  };
  data["Variabler"] = variabler.length > 0 ? "" : "ingen";
  variabler
    .sort((a, b) => (a.kode > b.kode ? 1 : -1))
    .forEach((v) => {
      data[v.altkode || v.kode.replace("NN-NA-BS-", "")] = v.kartlagtdato || "";
      //        data[v.altkode || v.kode.replace('NN-NA-BS-', '')] = t1 ? t1 + ": " + t2 : t2
    });
  return <Table keys={Object.keys(data)} data={data} />;
};

const Prosjekt = ({ prosjekt }) => {
  const keys = [
    "prosjektid",
    "prosjektnavn",
    "oppdragsgiver",
    "oppdragstaker",
    "kartlagtfradato",
    "kartlagttildato",
    "prosjektrapport",
    "basiskartlegging",
    "dekningskartverdi",
  ];
  return <Table keys={keys} data={prosjekt} />;
};
const Program = ({ program }) => {
  const keys = [
    "navn",
    "pilot",
    "programid",
    "beskrivelse",
    "programtype",
    "kartlegging5k",
    "kartleggingnt",
    "kartlegging20k",
    "kartleggingsinstruks",
  ];
  return <Table keys={keys} data={program} />;
};

const Table = ({ keys, data }) => {
  if (!data) return null;
  return (
    <div style={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        {keys.map((key) => (
          <Row title={key} value={data[key]} />
        ))}
        {data.Shape_Area && (
          <Row
            title="Areal"
            value={Prettyprint.prettyPrintAreal(data.Shape_Area)}
          />
        )}
        {data.Shape_Length && (
          <Row
            title="Omkrets"
            value={Prettyprint.prettyPrintDistance(data.Shape_Length)}
          />
        )}
      </Grid>
    </div>
  );
};

const Row = ({ title, value }) => (
  <>
    <Grid
      item
      xs={5}
      spacing={1}
      style={{ textTransform: "capitalize", color: "rgba(0,0,0,0.54)" }}
    >
      <Typography
        style={{ fontWeight: title === "Variabler" ? 600 : 400 }}
        variant="body2"
      >
        {title}
      </Typography>
    </Grid>
    <Grid item xs={7} spacing={0} style={{ wordWrap: "break-word" }}>
      <Typography variant="body2">{prettify(value)}</Typography>
    </Grid>
  </>
);

const prettify = (v) => {
  if (v === 0) return "nei";
  if (v === 1) return "ja";
  if (v === undefined || v === null) return null;
  if (typeof v === "number") return v;
  if (v.indexOf("http") === 0)
    return (
      <a href={v} target="_blank" rel="noopener noreferrer">
        {v}
      </a>
    );
  return v;
};
export default withRouter(Kartlegging);
