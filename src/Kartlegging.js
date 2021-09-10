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
  if (!punkt) return null;
  const nat =
    punkt.vektor &&
    Object.values(punkt.vektor).filter((e) => e.datasettkode === "NAT");
  if (nat.length === 0) return null;

  const ignoreNullValues = true;

  const kartlegginger = nat.map((natElement) => {
    const na = natElement.data;
    if (!na) return null;
    const k0 = na.kartleggingsenhet[0] || {};
    const heading = {
      områdeid: k0.område5kid || k0.område20kid || k0.naturtypeid,
      guid: k0.område5kguid || k0.område20kguid || k0.naturtypeguid,
    };

    return (
      <KartleggingObjekt
        na={na}
        heading={heading}
        ignoreNullValues={ignoreNullValues}
      />
    );
  });

  return (
    <LukkbartVindu
      onBack={() => onNavigateToTab("punkt")}
      onClose={onClose}
      tittel={"Natursystem: Kartlegging"}
    >
      {kartlegginger}
    </LukkbartVindu>
  );
};

const KartleggingObjekt = ({ na, heading, ignoreNullValues }) => {
  const [expanded, setExpanded] = React.useState();
  const checkExpanded = (id) => {
    // console.log('onChange', id, expanded);
    if (id === expanded) id = undefined;
    setExpanded(id);
  };
  return (
    <div>
      <div style={{ margin: 24 }}>
        <Table keys={Object.keys(heading)} data={heading} />
      </div>
      <Expa
        expanded={expanded}
        id="prosjekt"
        onChange={checkExpanded}
        summary="Prosjekt"
        details={
          <Prosjekt
            prosjekt={na.prosjekt}
            ignoreNullValues={ignoreNullValues}
          />
        }
      />
      {na.prosjekt && na.prosjekt.program && (
        <Expa
          expanded={expanded}
          id="program"
          onChange={checkExpanded}
          summary="Program"
          details={
            <Program
              program={na.prosjekt.program}
              ignoreNullValues={ignoreNullValues}
            />
          }
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
          onChange={checkExpanded}
          summary={"Kartleggingsenhet " + kle.altkode}
          details={
            <Kartleggingsenhet kle={kle} ignoreNullValues={ignoreNullValues} />
          }
        />
      ))}
    </div>
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

const Kartleggingsenhet = ({ kle, ignoreNullValues }) => {
  const bruker = kle.bruker || {};
  const variabler = kle.variabler || [];
  const ulkm = kle.ulkm || [];
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
    Faktaark: kle.faktaark,
    "": "",
    Variabler: "",
  };
  data["Variabler"] = variabler.length > 0 ? "" : "ingen";
  variabler
    .sort((a, b) => (a.kode > b.kode ? 1 : -1))
    .forEach((v) => {
      console.log("testing", v);
      data[v.altkode || v.kode.replace("NN-NA-BS-", "")] = (
        <div>
          {v.navnbeskrivelse
            ? v.navnbeskrivelse
            : v.overordnet
            ? v.overordnet[0] &&
              v.overordnet[0].tittel &&
              v.overordnet[0].tittel.nb
              ? v.overordnet[0].tittel.nb
              : ""
            : ""}
          <div style={{ fontSize: ".8rem" }}>{v.trinnbeskrivelse}</div>
        </div>
      );
      // prettify("kartlagtdato", v.kartlagtdato) || "";
      //        data[v.altkode || v.kode.replace('NN-NA-BS-', '')] = t1 ? t1 + ": " + t2 : t2
    });
  data["uLKM"] = ulkm.length > 0 ? "" : "ingen";
  ulkm
    .sort((a, b) => (a.ulkmkode > b.ulkmkode ? 1 : -1))
    .forEach((u) => {
      // console.log('uLKM', u);
      data[u.ulkmkode.replace("NN-NA-uLKM-", "")] = (
        <div>
          {u.gradientkodebeskrivelse}
          <div style={{ fontSize: ".8rem" }}>{u.trinnbeskrivelse}</div>
        </div>
      );
    });
  // console.log(data);
  return (
    <Table
      keys={Object.keys(data)}
      data={data}
      ignoreNullValues={ignoreNullValues}
    />
  );
};

const Prosjekt = ({ prosjekt, ignoreNullValues }) => {
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
  return (
    <Table keys={keys} data={prosjekt} ignoreNullValues={ignoreNullValues} />
  );
};
const Program = ({ program, ignoreNullValues }) => {
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
  return (
    <Table keys={keys} data={program} ignoreNullValues={ignoreNullValues} />
  );
};

const Table = ({ keys, data, ignoreNullValues }) => {
  if (!data) return null;
  return (
    <div style={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        {keys.map((key) => {
          if (ignoreNullValues) {
            if (data[key] === null || data[key] === undefined) return null;
          }
          return <Row title={key} value={data[key]} />;
        })}
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

const Row = ({ title, value }) => {
  const gridStyle = {
    textTransform: title === "uLKM" ? undefined : "capitalize",
    color: "rgba(0,0,0,0.54)",
  };
  return (
    <>
      <Grid item xs={5} spacing={1} style={gridStyle}>
        <Typography
          style={{
            fontWeight: title === "Variabler" || title === "uLKM" ? 600 : 400,
          }}
          variant="body2"
        >
          {title}
        </Typography>
      </Grid>
      <Grid item xs={7} spacing={0} style={{ wordWrap: "break-word" }}>
        <Typography variant="body2">{prettify(title, value)}</Typography>
      </Grid>
    </>
  );
};

const prettify = (t, v) => {
  if (v === undefined || v === null) return null;
  if (v === 0) return "nei";
  if (v === 1) return "ja";
  if (typeof v === "number") return v;
  if (typeof v === "object") return v;
  if (v.indexOf("http") === 0)
    return (
      <a href={v} target="_blank" rel="noopener noreferrer">
        {v}
      </a>
    );
  if (t.toLowerCase().indexOf("dato") >= 0) {
    const d = new Date(v);
    return `${d.toLocaleDateString("nb-NO")} ${d.toLocaleTimeString("nb-NO")}`;
  }
  return v;
};
export default withRouter(Kartlegging);
