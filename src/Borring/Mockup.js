import React from 'react'
import Listeelement from './Listeelement'

const Mockup = props => {
  return (
    <React.Fragment>
      <Listeelement kode="VV" primary="Gammelelva" secondary="Naturreservat" />
      <Listeelement
        kode="LA_NF"
        primary="Nedskåret fjordlandskap"
        secondary="Landskap"
      />
      {false && (
        <Listeelement
          kode="jordbrukspreg"
          primary="Høyt jordbrukspreg"
          secondary="Jordbrukspreg"
        />
      )}
      <Listeelement kode="NA_T44" primary="Åker" secondary="Natursystem" />
      <Listeelement
        kode="RL_VU"
        primary="Sårbar naturtype"
        secondary="Rødliste"
      />
      <Listeelement
        kode="BS_7"
        primary="Gjennomgripende grøfting"
        secondary="Tilstandsvariasjon"
      />
      <Listeelement
        kode="BS_6"
        primary="Svakt oseanisk seksjon, sørboreal sone"
        secondary="Regional naturvariasjon"
      />
    </React.Fragment>
  )
}

export default Mockup
