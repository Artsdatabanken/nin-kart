import React from "react";
import { withRouter } from "react-router";
import { Grid, Typography } from "@material-ui/core";
import Prettyprint from "../../../Funksjoner/prettyprint";
import SectionExpand from "../../../GjenbruksElement/SectionExpand";

const Kartlegging = ({ punkt }) => {
  if (!punkt) return null;
  const nat =
    punkt.vektor &&
    Object.values(punkt.vektor).filter(e => e.datasettkode === "NAT");
  if (nat.length === 0) return null;
  const ignoreNullValues = true;
  const kartlegginger = nat.map(natElement => {
    const na = natElement.data;
    if (!na) return null;
    const k0 = na.kartleggingsenhet[0] || {};
    const heading = {
      områdeid: k0.område5kid || k0.område20kid || k0.naturtypeid,
      guid: k0.område5kguid || k0.område20kguid || k0.naturtypeguid
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
    <div className="subsection">
      <h4>Kartlegging av natursystem </h4>
      <SectionExpand title={"Punktdetaljer"}>{kartlegginger}</SectionExpand>
    </div>
  );
};

const KartleggingObjekt = ({ na, heading, ignoreNullValues }) => {
  return (
    <>
      <Table keys={Object.keys(heading)} data={heading} />

      <div className="subsection">
        <h6>Detaljinfo</h6>
        <SectionExpand title={"Prosjekt"}>
          <Prosjekt
            prosjekt={na.prosjekt}
            ignoreNullValues={ignoreNullValues}
          />
        </SectionExpand>

        {na.prosjekt && na.prosjekt.program && (
          <SectionExpand title={"Program"}>
            <Program
              program={na.prosjekt.program}
              ignoreNullValues={ignoreNullValues}
            />
          </SectionExpand>
        )}

        {(na.kartleggingsenhet || []).map(kle => (
          <SectionExpand title={"Kartleggingsenhet " + kle.altkode}>
            <Kartleggingsenhet kle={kle} ignoreNullValues={ignoreNullValues} />
          </SectionExpand>
        ))}
      </div>
    </>
  );
};

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
    Variabler: ""
  };
  data["Variabler"] = variabler.length > 0 ? "" : "ingen";
  variabler
    .sort((a, b) => (a.kode > b.kode ? 1 : -1))
    .forEach(v => {
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
    .forEach(u => {
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
    "dekningskartverdi"
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
    "kartleggingsinstruks"
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
        {keys.map(key => {
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
    color: "rgba(0,0,0,0.54)"
  };
  return (
    <>
      <Grid item xs={5} spacing={1} style={gridStyle}>
        <Typography
          style={{
            fontWeight: title === "Variabler" || title === "uLKM" ? 600 : 400
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
