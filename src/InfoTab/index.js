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
      Hvis du vet hva du vil se på, er det uten tvil raskest å benytte seg av
      søkefeltet. Her kan du skive inn og få forslag basert på eksisterende
      undersider i Natur i Norge-systemet.
    </p>
    <h3>Finn en lokasjon</h3>
    <p>
      For å finne en bestemt lokasjon er det best å navigere seg i selve kartet.
      Her kan du velge å zoome inn og ut enten ved hjelp av pluss og
      minusknappene, bruke fingrene på mobil, eller scrollbar på
      desktop-løsninger. Om du trykker på kartet setter du en markør på stedet
      du trykte på, og vil få opp mer informasjon om denne plassen. Om du ønsker
      å se samlet informasjon om et område, er det den letteste måten å få dette
      opp på.
    </p>
    <h3>Benytt deg av hierarkiet</h3>
    <p>
      Inne i informasjonsboksen på pc-enheter eller informasjonsfanen på mobil
      vil du kunne finne et felt kalt hierarki som viser hvor du har havnet i
      sidesystemet. Alt inne i boksen hierarki er ledd ovenfor ditt nåværende
      tidspunkt. Under dette hierarkiet vil det være forskjellige bokser med
      undersider du kan navigere deg videre til. Nøyaktig hvordan denne
      navigeringen fremstår er for tiden under endring.
    </p>

    <h2>Fraværende data</h2>
    <p>
      Vi jobber fortløpende med å få tak i og legge til nye datakilder fra våre
      samarbeidspartnere, men kan ikke garantere at alt finnes til en hver tid.
      Vi er avhengige av at våre dataleverandører som stiller med åpne data gir
      oss fri bruk og tilgang for å kunne vise det frem på best mulig måte. Hvis
      du savner et datasett, anbefaler vi deg å ta kontakt med dataleverandør.
    </p>
  </div>
);

export default InfoTab;
