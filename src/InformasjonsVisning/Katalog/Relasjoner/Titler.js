const la = {
  dominerende: {
    kort: "Dominerende landskapselement",
    lang:
      "Landskapselement med gjennomsnittlig arealdekning eller volumandel større enn 1/4 av i et utvalg av enkeltobservasjonsenheter."
  },
  vanlig: {
    kort: "Vanlig forekommende landskapselementer",
    lang:
      "Landskapselement (landformer og natursystemer) med frekvens større enn 1/8 i et utvalg enkeltobservasjonsenheter, eller landskapselement med høyere frekvens og dekning i en aktuell landskapstype (hovedtype eller grunntype) enn i et sammenliknbart utvalg typer (f.eks. andre hovedtyper som tilhører samme hovedtypegruppe eller andre grunntyper som tilhører samme hovedtype)."
  },
  gradient: {
    kort: "Gradient-tyngdepunktart",
    lang:
      "Landskapselement med høyere frekvens og dekning på et gitt trinn langs en landskapsgradient (KLG) enn på ethvert annet trinn langs den samme KLGen (gitt at variasjonen langs alle landskapsgradienter holdes konstant."
  },
  Landskapselement:
    "Naturlig eller menneskeskapt objekt, enhet eller egenskap, inkludert naturtype-arealenheter på natursystem- og natursystemkompleks-nivåene, som lar seg identifisere og observere på en landskapsrelevant romlig skala."
};

const titler = {
  "Gradient-tyngdepunkt for landskapselement": {
    subtitle: la.gradient.lang
  },
  "Gradient-tyngdepunkt i landskap": {
    subtitle: la.gradient.lang
  },
  "Vanlig forekommende i landskap": {
    subtitle: la.vanlig.lang
  },
  "Vanlig forekommende landskapselement": {
    subtitle: la.vanlig.lang
  },
  "Dominerende landskapselement": {
    subtitle: la.dominerende.lang
  },
  "Dominerende i landskap": {
    subtitle: la.dominerende.lang
  },
  mengdeart: {
    title: "Mengdearter",
    subtitle:
      "Art med gjennomsnittlig dekning eller biomasseandel større enn 1/8 i et utvalg av enkeltobservasjonsenheter."
  },
  dominerende_mengdeart: {
    title: "Dominerende mengdearter",
    subtitle:
      "Art med gjennomsnittlig dekning eller biomasseandel større enn 1/4 i et utvalg av enkeltobservasjonsenheter."
  },
  vanlig_art: {
    title: "Vanlige arter",
    subtitle:
      "Art med frekvens større enn 1/8 i et utvalg enkeltobservasjonsenheter. For at en art skal være «vanlig», må den tilfredsstille dette kravet om frekvens > 1/8 i hele naturtypens utbredelsesområde, ikke bare innenfor artens utbredelsesområde."
  },
  konstant_art: {
    title: "Konstante arter",
    subtitle:
      "Art med frekvens større enn 4/5 i et utvalg enkeltobservasjonsenheter. Dette er den klassiske definisjonen av «konstant»  som er brukt i vegetasjonsøkologi."
  },
  tyngdepunktart: {
    title: "Tyngdepunktarter",
    subtitle:
      "Art med høyere frekvens og dekning i en aktuell naturtype (hovedtype eller grunntype) enn i et sammenliknbart utvalg typer (f.eks. andre hovedtyper som tilhører samme hovedtypegruppe eller andre grunntyper som tilhører samme hovedtype."
  },
  "gradient-tyngdepunktart": {
    title: "Gradient-tyngdepunktarter",
    subtitle:
      "Art med høyere frekvens og dekning på et gitt trinn langs en lokal kompleks miljøgradient (LKMg) enn på ethvert annet trinn langs den samme LKMg (gitt at variasjonen langs alle andre lokale komplekse miljøvariabler holdes konstant."
  },
  kjennetegnende_tyngdepunktart: {
    title: "Kjennetegnende tyngdepunktarter",
    subtitle:
      "Tyngdepunktart som utelukkende eller nesten utelukkende forekommer i en naturtype eller gruppe av naturtyper på et eller annet generaliseringsnivå."
  },
  skilleart: {
    title: "Skilleart",
    subtitle:
      "Art med høyere frekvens og/eller dekning i én av to eller flere naturtyper som sammenliknes. For skillearter angis hvilke basistrinn langs hvilke LKM’er de er skillearter for, på en standardisert måte. F.eks. betyr «absolutt skilleart[UF∙f|g]» at arten er absolutt skilleart for uttørkingsfare (UF) basistrinn f mot basistrinn g."
  },
  "svak_relativ skilleart": {
    title: "Svak relativ skilleart",
    subtitle: ""
  },
  "sterk_relativ skilleart": {
    title: "Sterk relativ skilleart",
    subtitle: ""
  },
  absolutt_skilleart: {
    title: "Absolutte skillearter",
    subtitle:
      "Art som normalt bare forekommer i én blant to eller flere naturtyper som sammenliknes."
  }
};

export { la, titler };
