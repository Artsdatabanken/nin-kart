import React from "react";

const Hjelp = ({ aktivTab }) => (
  <>
    <div
      className={
        (aktivTab === "informasjon" ? "mobile_on" : "mobile_off") + " main_body"
      }
    >
      <div className="main_body_wrapper">
        <h1>Informasjon om og hjelp til NiN-Kart</h1>
        <p>
          <b>
            Vi jobber kontinuelig med å legge til ny funksjonalitet og forbedre
            den eksisterende. Ikke alt er på plass ennå, og mye er foreløpig
            under produksjon. Ta likevel gjerne kontakt om du har
            tilbakemeldinger.
          </b>
        </p>

        <h2>Skjulte og begrensede datasett</h2>
        <h3>Natursystem</h3>
        <p>
          Kartbladene fra natursystem er for tiden skjult, da dataeiere ønsker
          bedre sikring av kvaliteten. Det er likevel mulig å bla i hierarkiet
          for å lese om de forskjellige systemene.
        </p>

        <h3>Arter</h3>
        <p>
          Grunnet enorme datamengder har vi i første omgang kun vist arter som
          er byggesteiner for klassifisering av landskapstyper og natursystem.
          Etterhvert vil også flere arter bli tilgjengelige, med fokus på
          rødlistede og svartelistede arter.
        </p>

        <h3>Naturvernområder</h3>
        <p>
          På grunn av tunge mengder data er naturvernområdene midlertidig
          avskrudd i kartet mens vi finner ut hvordan å best presentere
          datasettene.
        </p>

        <h2>Hvordan navigere?</h2>
        <h3>Søkefeltet</h3>
        <p>
          Søkefeltet er en effektiv måte å lete etter konkrete arter, områder
          eller naturtyper på. Her kan du taste inn et navn på en art, et område
          eller en naturtype og få forslag basert på undersider som finnes i
          Natur i Norge-systemet.
        </p>
        <h3>Finn en lokalitet</h3>
        <p>
          For å finne all informasjon som kartet inneholder på et bestemt sted
          er det best å navigere i selve kartet. Her kan du zoome inn og ut
          enten ved hjelp av pluss- og minusknappene, bruke fingrene på mobil
          eller scrollbar på desktop-løsninger. Om du trykker på kartet setter
          du en markør på stedet du trykte på, og du vil få opp mer informasjon
          om denne plassen. Ønsker du å se samlet informasjon om et område, er
          det den letteste måten å få dette opp på.
        </p>
        <h3>Benytt deg av hierarkiet</h3>
        <p>
          Inne i informasjonsboksen på pc-enheter eller informasjonsfanen på
          mobil vil du kunne finne et felt kalt hierarki som viser hvor du har
          havnet i sidesystemet. Alt inne i boksen hierarki er høyere nivå enn
          ditt nåværende utvalg. Under dette hierarkiet vil det være
          forskjellige bokser med undersider du kan navigere deg videre til.
        </p>

        <h2>Fravær av data</h2>
        <p>
          Vi jobber fortløpende med tilgjengeliggjøre data fra våre
          samarbeidspartnere, men kan ikke garantere at alt finnes til en hver
          tid. Vi er avhengige av at våre dataleverandører gir oss fri bruk og
          tilgang. Hvis du savner et datasett, anbefaler vi deg å ta kontakt med
          Artsdatabanken, eller den enkelte dataeier.
        </p>
      </div>
    </div>
  </>
);

export default Hjelp;
