import MediaQuery from 'react-responsive'
import React from 'react'
import Kodekort from './Kodekort'
import StatistikkContainer from '../Statistikk/StatistikkContainer'
import { Paper, List, div, Subheader } from 'material-ui'
import FetchContainer from '../../FetchContainer'
import Kodeliste from './Kodeliste'
import { RaisedButton } from 'material-ui'
import NaturomraderIcon from 'material-ui/svg-icons/editor/pie-chart-outlined'
import ArterIcon from 'material-ui/svg-icons/action/fingerprint'

const Fact = ({ tittel, verdi, ikon, synlig }) => {
  console.log(tittel, verdi, synlig)
  if (!synlig || !verdi) return null
  return (
    <div
      style={{
        fontSize: 13,
        paddingLeft: 24,
        lineHeight: '1.5em',
      }}
    >
      <span style={{ fontWeight: 700 }}>{tittel}:&nbsp;</span>
      {verdi}
    </div>
  )
}

class KodeVindu extends React.Component {
  handleShowColorpicker = kode => {
    const nyKode = this.state.ekspandertKode === kode ? null : kode
    this.setState({ ekspandertKode: nyKode })
  }
  state = {}

  render() {
    const props = this.props
    const selv = props.meta.selv || {}
    const avatarUtenRamme = props.meta.utenRamme
    return (
      <FetchContainer>
        <Paper
          zDepth={4}
          style={{
            height: '100%',
            position: 'fixed',
            left: 0,
            top: 0,
            width: 408,
            overflow: 'auto',
          }}
        >
          {props.meta && (
            <Kodekort
              {...props.meta}
              onGoToCode={props.onGoToCode}
              data={props.data}
              language={props.language}
            />
          )}
          {props.meta.bbox && (
            <MediaQuery maxWidth={1224}>
              <div style={{ float: 'right', marginRight: 24, marginTop: 16 }}>
                <RaisedButton
                  onClick={() => props.onFitBounds(props.meta.bbox)}
                >
                  Vis i kart
                </RaisedButton>
              </div>
            </MediaQuery>
          )}
          <div style={{ padding: 24 }}>
            {(props.meta.ingress ||
              props.data.antallNaturomrader ||
              props.data.antallArter) && (
              <div
                style={{
                  fontSize: 18,
                  color: 'rgba(0, 0, 0, 0.54)',
                }}
              >
                Fakta
              </div>
            )}
            {props.meta.ingress && (
              <div style={{ fontSize: 13, color: 'rgba(0,0,0,0.87)' }}>
                {props.meta.ingress}
                {props.meta.infoUrl && (
                  <span>
                    &nbsp;<a
                      target="top"
                      style={{ color: 'rgba(0,0,0,0.87)' }}
                      href={props.meta.infoUrl}
                    >
                      Artsdatabanken
                    </a>
                  </span>
                )}
              </div>
            )}
          </div>
          <Fact
            tittel="Areal"
            synlig={props.data.antallNaturomrader}
            verdi={`${(props.data.antallNaturomrader * 1.3).toFixed(
              0
            )} km² (i ${props.data.antallNaturomrader} områder)`}
            ikon={<NaturomraderIcon />}
          />
          <Fact
            tittel="Truede arter observert"
            verdi={props.data.antallArter}
            synlig={props.data.antallArter}
            ikon={<ArterIcon />}
          />
          <List>
            <Kodeliste
              title={`Innhold`}
              apidata={props.data ? props.data.barn : []}
              metadata={props.meta.barn}
              ekspandertKode={this.state.ekspandertKode}
              onGoToCode={props.onGoToCode}
              onMouseEnter={props.onMouseEnter}
              onMouseLeave={props.onMouseLeave}
              onShowColorpicker={this.handleShowColorpicker}
              onUpdateLayerProp={props.onUpdateLayerProp}
              language={props.language}
              avatarUtenRamme={avatarUtenRamme}
            />

            {props.meta.prosedyrekategori && (
              <Kodeliste
                title="Definisjon"
                metadata={{
                  [props.meta.prosedyrekategori.kode]:
                    props.meta.prosedyrekategori,
                  [props.meta.definisjonsgrunnlag.kode]:
                    props.meta.definisjonsgrunnlag,
                }}
                ekspandertKode={this.state.ekspandertKode}
                onGoToCode={props.onGoToCode}
                onMouseEnter={props.onMouseEnter}
                onMouseLeave={props.onMouseLeave}
                onShowColorpicker={this.handleShowColorpicker}
                onUpdateLayerProp={props.onUpdateLayerProp}
                language={props.language}
              />
            )}

            {props.meta &&
              props.meta.relasjon &&
              props.meta.relasjon.mengdeart && (
                <Kodeliste
                  title={`Mengdearter`}
                  subtitle={`Art med gjennomsnittlig dekning eller biomasseandel større enn 1/8 i et utvalg av enkeltobservasjonsenheter.`}
                  apidata={props.data ? props.data.barn : []}
                  metadata={props.meta.relasjon.mengdeart}
                  ekspandertKode={this.state.ekspandertKode}
                  onGoToCode={props.onGoToCode}
                  onMouseEnter={props.onMouseEnter}
                  onMouseLeave={props.onMouseLeave}
                  onUpdateLayerProp={props.onUpdateLayerProp}
                  language={props.language}
                />
              )}

            {props.meta &&
              props.meta.relasjon &&
              props.meta.relasjon.dominerende_mengdeart && (
                <Kodeliste
                  title={`Dominerende mengdearter`}
                  subtitle={`Art med gjennomsnittlig dekning eller biomasseandel større enn 1/4 i et utvalg av enkeltobservasjonsenheter.`}
                  apidata={props.data ? props.data.barn : []}
                  metadata={props.meta.relasjon.dominerende_mengdeart}
                  ekspandertKode={this.state.ekspandertKode}
                  onGoToCode={props.onGoToCode}
                  onMouseEnter={props.onMouseEnter}
                  onMouseLeave={props.onMouseLeave}
                  onUpdateLayerProp={props.onUpdateLayerProp}
                  language={props.language}
                />
              )}

            {props.meta &&
              props.meta.relasjon &&
              props.meta.relasjon.vanlig_art && (
                <Kodeliste
                  title={`Vanlige arter`}
                  subtitle={`Art med frekvens større enn 1/8 i et utvalg enkeltobservasjonsenheter. For at en art skal være «vanlig», må den tilfredsstille dette kravet om frekvens > 1/8 i hele naturtypens utbredelsesområde, ikke bare innenfor artens utbredelsesområde.`}
                  apidata={props.data ? props.data.barn : []}
                  metadata={props.meta.relasjon.vanlig_art}
                  ekspandertKode={this.state.ekspandertKode}
                  onGoToCode={props.onGoToCode}
                  onMouseEnter={props.onMouseEnter}
                  onMouseLeave={props.onMouseLeave}
                  onUpdateLayerProp={props.onUpdateLayerProp}
                  language={props.language}
                />
              )}

            {props.meta &&
              props.meta.relasjon &&
              props.meta.relasjon.konstant_art && (
                <Kodeliste
                  title={`Konstante arter`}
                  subtitle={`Art med frekvens større enn 4/5 i et utvalg enkeltobservasjonsenheter. Dette er den klassiske definisjonen av «konstant»  som er brukt i vegetasjonsøkologi`}
                  apidata={props.data ? props.data.barn : []}
                  metadata={props.meta.relasjon.konstant_art}
                  ekspandertKode={this.state.ekspandertKode}
                  onGoToCode={props.onGoToCode}
                  onMouseEnter={props.onMouseEnter}
                  onMouseLeave={props.onMouseLeave}
                  onUpdateLayerProp={props.onUpdateLayerProp}
                  language={props.language}
                />
              )}

            {props.meta &&
              props.meta.relasjon &&
              props.meta.relasjon.tyngdepunktart && (
                <Kodeliste
                  title={`Tyngdepunktarter`}
                  subtitle={`Art med høyere frekvens og dekning i en aktuell naturtype (hovedtype eller grunntype) enn i et sammenliknbart utvalg typer
                  (f.eks. andre hovedtyper som tilhører samme hovedtypegruppe eller andre grunntyper som tilhører samme hovedtype`}
                  apidata={props.data ? props.data.barn : []}
                  metadata={props.meta.relasjon.tyngdepunktart}
                  ekspandertKode={this.state.ekspandertKode}
                  onGoToCode={props.onGoToCode}
                  onMouseEnter={props.onMouseEnter}
                  onMouseLeave={props.onMouseLeave}
                  onUpdateLayerProp={props.onUpdateLayerProp}
                  language={props.language}
                />
              )}

            {props.meta &&
              props.meta.relasjon &&
              props.meta.relasjon['gradient-tyngdepunktart'] && (
                <Kodeliste
                  title={`Gradient-tyngdepunktarter`}
                  subtitle={`Art med høyere frekvens og dekning på et gitt trinn langs en lokal kompleks miljøgradient (LKMg) enn på ethvert annet trinn langs den samme LKMg (gitt at variasjonen langs alle andre lokale komplekse miljøvariabler holdes konstant`}
                  apidata={props.data ? props.data.barn : []}
                  metadata={props.meta.relasjon['gradient-tyngdepunktart']}
                  ekspandertKode={this.state.ekspandertKode}
                  onGoToCode={props.onGoToCode}
                  onMouseEnter={props.onMouseEnter}
                  onMouseLeave={props.onMouseLeave}
                  onUpdateLayerProp={props.onUpdateLayerProp}
                  language={props.language}
                />
              )}

            {props.meta &&
              props.meta.relasjon &&
              props.meta.relasjon.kjennetegnende_tyngdepunktart && (
                <Kodeliste
                  title={`Kjennetegnende tyngdepunktarter`}
                  subtitle={`Tyngdepunktart som utelukkende eller nesten utelukkende forekommer i en naturtype eller gruppe av naturtyper på et eller annet generaliseringsnivå`}
                  apidata={props.data ? props.data.barn : []}
                  metadata={props.meta.relasjon.kjennetegnende_tyngdepunktart}
                  ekspandertKode={this.state.ekspandertKode}
                  onGoToCode={props.onGoToCode}
                  onMouseEnter={props.onMouseEnter}
                  onMouseLeave={props.onMouseLeave}
                  onUpdateLayerProp={props.onUpdateLayerProp}
                  language={props.language}
                />
              )}

            {props.meta &&
              props.meta.relasjon &&
              props.meta.relasjon.skilleart && (
                <Kodeliste
                  title={`Skilleart`}
                  subtitle={`Art med høyere frekvens og/eller dekning i én av to eller flere naturtyper som sammenliknes. For skillearter angis hvilke basistrinn langs hvilke LKM’er de er skillearter for, på en standardisert måte. F.eks. betyr «absolutt skilleart[UF∙f|g]» at arten er absolutt skilleart for uttørkingsfare (UF) basistrinn f mot basistrinn g.`}
                  apidata={props.data ? props.data.barn : []}
                  metadata={props.meta.relasjon.skilleart}
                  ekspandertKode={this.state.ekspandertKode}
                  onGoToCode={props.onGoToCode}
                  onMouseEnter={props.onMouseEnter}
                  onMouseLeave={props.onMouseLeave}
                  onUpdateLayerProp={props.onUpdateLayerProp}
                  language={props.language}
                />
              )}

            {props.meta &&
              props.meta.relasjon &&
              props.meta.relasjon.absolutt_skilleart && (
                <Kodeliste
                  title={`Absolutte skillearter`}
                  subtitle={`Art som normalt bare forekommer i én blant to eller flere naturtyper som sammenliknes`}
                  apidata={props.data ? props.data.barn : []}
                  metadata={props.meta.relasjon.absolutt_skilleart}
                  ekspandertKode={this.state.ekspandertKode}
                  onGoToCode={props.onGoToCode}
                  onMouseEnter={props.onMouseEnter}
                  onMouseLeave={props.onMouseLeave}
                  onUpdateLayerProp={props.onUpdateLayerProp}
                  language={props.language}
                />
              )}

            {false && (
              <React.Fragment>
                <Subheader>Om {selv.tittel}</Subheader>
                <StatistikkContainer
                  ingress={props.meta.ingress}
                  dataUrl={'/kode/' + props.data.kode}
                />
              </React.Fragment>
            )}
          </List>
        </Paper>
      </FetchContainer>
    )
  }
}

export default KodeVindu
