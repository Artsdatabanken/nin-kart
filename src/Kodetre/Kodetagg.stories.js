import React from 'react'
import { storiesOf } from '@storybook/react'
import { muiTheme } from 'storybook-addon-material-ui'
import Kodetagg from './Kodetagg'

const rødlistekoder = {
  navn: 'Truede arter',
  forklaring:
    'Truede arter er arter som står i fare for å dø ut. Den offisielle oversikten over hvilke arter dette gjelder gis i den nasjonale rødlista. Fjellrev, ulv og lomvi er blant artene som er kritisk truet.',
  versjon: '3.1',
  url: 'https://no.wikipedia.org/wiki/IUCNs_r%C3%B8dliste#R%C3%B8dlistestatus',
  tagger: [
    {
      kode: 'NE',
      navn: 'Ikke evaluert',
      color: '#111',
      backgroundColor: '#eee',
      forklaring:
        'Arten har av ukjente årsaker ikke blitt evaluert/vurdert. Det kan være flere årsaker til dette, for eksempel at arten er relativt nyoppdaget og derfor mangler anerkjennelse som egen art av IUCN eller den er utdødd for så lenge siden at den ikke er interessant å kategorisere.',
    },
    {
      kode: 'DD',
      navn: 'Mangelfullt datagrunnlag',
      color: '#111',
      backgroundColor: '#eee',
      forklaring:
        'I denne kategorien havner arter som mangler nødvendig informasjon til å vurdere trusselbildet. Som oftest er dette arter som allikevel ville havnet på rødlista, dersom kunnskapen om dem var tilstrekkelig.',
    },
    {
      kode: 'LC',
      navn: 'Livskraftig',
      color: '#fff',
      backgroundColor: '#006666',
      forklaring: 'Dette er arter som ikke er direkte truet.',
    },
    {
      kode: 'NT',
      navn: 'Nær truet',
      color: '#99cc99',
      backgroundColor: '#006666',
      forklaring:
        'Hensynskrevende arter som ikke tilhører kategori CR, EN eller VU, men som på grunn av tilbakegang krever spesielle hensyn og tiltak. I Norge har disse artene 5 % sannsynlighet for å dø ut innen 100 år.',
    },
    {
      kode: 'VU',
      navn: 'Sårbar',
      color: '#f8f2b1',
      backgroundColor: '#cc9900',
      forklaring:
        'Arter som er truet og har 10 % risiko for å dø ut innen 100 år.',
    },
    {
      kode: 'EN',
      navn: 'Sterkt truet',
      color: '#ffcc99',
      backgroundColor: '#cc6633',
      forklaring:
        'Arter som har høy risiko for å dø ut, nærmere bestemt 20 % risiko for å dø ut fra 20 til 100 år fram i tid.',
    },
    {
      kode: 'CR',
      navn: 'Kritisk truet',
      color: '#ffcccc',
      backgroundColor: '#cc3333',
      forklaring:
        'Arter som er direkte truet og som har 50 % risiko for å dø ut fra 10 til 100 år fram i tid.',
    },
    {
      kode: 'EW',
      navn: 'Utryddet i vill tilstand',
      color: '#fff',
      backgroundColor: '#000',
      forklaring:
        'Brukes om arter som er antatt å være utryddet i vill tilstand, men som fortsatt overlever i fangenskap.',
    },
    {
      kode: 'EX',
      navn: 'Utryddet',
      color: '#cc3333',
      backgroundColor: '#000',
      forklaring: 'Arten har opphørt å eksistere.',
    },
  ],
}

storiesOf('Kodetagg', module)
  .addDecorator(muiTheme())
  .add('Rødliste', () => {
    return (
      <div style={{ padding: 8 }}>
        {rødlistekoder.tagger.map(tag => (
          <Kodetagg
            key={tag.kode}
            kode={tag.kode}
            navn={tag.navn}
            color={tag.color}
            backgroundColor={tag.backgroundColor}
          />
        ))}
      </div>
    )
  })
