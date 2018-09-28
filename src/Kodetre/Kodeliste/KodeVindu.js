import React from 'react'
import { SettingsContext } from '../../SettingsContext'
import språk from '../../språk'
import Graf from './Graf'
import Kodekort from './Kodekort'
import Kodeliste from './Kodeliste'
import Statistikk from './Statistikk'

class KodeVindu extends React.Component {
  render() {
    const {
      erAktivert,
      onGoToCode,
      onFitBounds,
      meta,
      data,
      onMouseEnter,
      onMouseLeave,
      onToggleLayer,
      opplystKode,
    } = this.props
    if (!meta) return null
    const {
      kode,
      prefiks,
      bbox,
      ingress,
      infoUrl,
      tittel,
      nivå,
      overordnet,
      antallNaturomrader,
      antallArter,
      stats,
    } = meta
    return (
      <div
        square="false"
        elevation={4}
        style={{
          position: 'relative',
          top: -72,
        }}
      >
        <Kodekort
          kode={kode}
          prefiks={prefiks}
          bbox={bbox}
          tittel={tittel}
          nivå={nivå}
          overordnet={overordnet}
          onGoToCode={onGoToCode}
          erAktivert={erAktivert}
          onFitBounds={onFitBounds}
          onToggleLayer={onToggleLayer}
        />
        {prefiks !== 'AO' && (
          <Statistikk
            tittel={språk(meta.tittel)}
            toppnavn={this.toppnivåNavn(meta.overordnet)}
            ingress={ingress}
            infoUrl={infoUrl}
            stats={stats}
            arealVindu={antallArter}
            arterVindu={antallArter}
            geometrierVindu={antallNaturomrader}
          />
        )}
        <SettingsContext.Consumer>
          {context => (
            <Kodeliste
              title="Innhold"
              størsteAreal={data.størsteAreal}
              apidata={data.barn}
              metadata={meta.barn}
              onGoToCode={onGoToCode}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              opplystKode={opplystKode}
              visKode={context.visKoder}
            />
          )}
        </SettingsContext.Consumer>
        <Graf graf={meta.graf} onGoToCode={onGoToCode} />
      </div>
    )
  }

  toppnivåNavn(forfedre) {
    if (forfedre.length < 2) return null
    return språk(forfedre[forfedre.length - 2].tittel)
  }
}

export default KodeVindu
