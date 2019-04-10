import React from "react";

const InfoTab = () => (
  <div
    className="InfoTab"
    style={{ padding: 15, paddingTop: 50, textAlign: "center" }}
  >
    <h1>Informasjon om NiN-Kart</h1>
    <p>
      <b>
        Vi jobber kontinuelig med å legge til ny - og forbedre funksjonaliteten.
        Ikke alt er på plass ennå, og mye er ennå under produksjon. Ta likevel
        gjerne kontakt om det skulle være noe.
      </b>
    </p>

    <h2>Hvordan navigere?</h2>
    <h3>Søkefeltet</h3>
    <p>
      Hvis du vet hva du vil se på, anbefaler vi å bruke søkefeltet. 
      Her kan du skive inn og få forslag basert på eksisterende
      undersider i Natur i Norge-systemet.
    </p>
    <h3>Finn en lokalitet</h3>
    <p>
      For å finne all informasjon kartet inneholder på et bestemt sted er det best å navigere i selve kartet.
      Her kan du velge å zoome inn og ut enten ved hjelp av pluss og
      minusknappene, bruke fingrene på mobil eller scrollbar på
      desktop-løsninger. Om du trykker på kartet setter du en markør på stedet
      du trykte på, og du vil få opp mer informasjon om denne plassen. Ønsker du
      å se samlet informasjon om et område, er det den letteste måten å få dette
      opp på.
    </p>
    <h3>Benytt deg av hierarkiet</h3>
    <p>
      Inne i informasjonsboksen på pc-enheter eller informasjonsfanen på mobil
      vil du kunne finne et felt kalt hierarki som viser hvor du har havnet i
      sidesystemet. Alt inne i boksen hierarki er høyere nivå enn ditt nåværende
      utvalg. Under dette hierarkiet vil det være forskjellige bokser med
      undersider du kan navigere deg videre til. 
    </p>

    <h2>Fravær av data</h2>
    <p>
      Vi jobber fortløpende med tilgjengeliggjøre data fra våre
      samarbeidspartnere, men kan ikke garantere at alt finnes til en hver tid.
      Vi er avhengige av at våre dataleverandører gir
      oss fri bruk og tilgang. Hvis
      du savner et datasett, anbefaler vi deg å ta kontakt med Artsdatabanken, eller den enkelte dataeier.
    </p>
  </div>
);

export default InfoTab;
