import React from 'react'
import Kodeliste from './Kodeliste'
import TopBar from '../../TopBar/TopBar'
import backend from '../../backend'
import { List, ListItem, Avatar } from 'material-ui'
import { Route } from 'react-router-dom'

const dummyMeta = {
  forelder: {
    kode: 'Kode forelder',
    tittel: 'Tittel forelder',
    avatar: 'https://www.artsdatabanken.no/Media/F16592?mode=480x480',
  },
  selv: {
    kode: 'Kode',
    tittel: 'Tittel',
    media: 'https://artsdatabanken.no/Media/F21489?mode=540x540',
  },
  barn: {},
  relasjon: [],
}
class KodelisteContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.fetchData(this.props.kode)
  }

  componentWillReceiveProps(nextProps) {
    this.fetchData(nextProps.kode)
  }

  fetchData(kode) {
    this.setState({ meta: dummyMeta, data: null })
    backend.hentKode(kode || '').then(data => this.setState({ data: data }))
    backend.hentKodeMeta(kode).then(data => this.setState({ meta: data }))
  }

  render() {
    const data = this.state.data
    if (!data) return null
    return (
      <div>
        <TopBar
          onGoBack={this.props.onGoBack}
          toggleShowKodeListe={this.props.toggleShowKodeListe}
          showKodeListe={this.props.showKodeListe}
          title={data.kode}
          parentId={this.state.parentId}
          onSearchResults={items => {
            this.setState({ searchResults: items })
          }}
        />
        {this.state.searchResults ? (
          <List style={{ overflow: 'auto', maxHeight: 600 }}>
            <Route
              render={({ history }) =>
                this.state.searchResults.map(item => (
                  <ListItem
                    style={{ width: 500, pointer: 'hand' }}
                    onClick={() => {
                      history.push('/' + item.code)
                      this.setState({ searchResults: null })
                    }}
                    key={item.code}
                    primaryText={item.name}
                    secondaryText={item.code}
                    leftAvatar={
                      <Avatar src="https://www.artsdatabanken.no/Media/F1698?mode=480x480" />
                    }
                  />
                ))
              }
            />
          </List>
        ) : (
          this.state.meta &&
          this.props.showKodeListe && (
            <Kodeliste
              data={data}
              meta={this.state.meta}
              filterCode={this.props.filterCode}
              filter={this.props.filter}
              onGoToCode={this.props.onGoToCode}
              onAddLayer={this.props.onAddLayer}
              onCheck={this.props.onCheckChange}
              isSelected={this.props.isSelected}
            />
          )
        )}
      </div>
    )
  }
}

export default KodelisteContainer
