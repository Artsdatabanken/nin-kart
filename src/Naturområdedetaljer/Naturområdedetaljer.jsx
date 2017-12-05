import React, { Component } from 'react'
import {Paper} from 'material-ui'
// import Naturniva from './Naturnivå'
import Detaljer from './Detaljer'
import Kartlegging from './Kartlegging'
import Omrader from './Omrader'
import backend from '../backend'
import FactList from '../FactList/FactList'

class Naturområdedetaljer extends Component {
    state = {
        natureArea: "",
        metadata: "",
        factItems: []
    };

    componentDidMount() {
        this.goFetch(this.props.natureAreaId)
    }

    componentWillReceiveProps(nextProps) {

    }

    goFetch(id) {
        backend.getNatureAreaByLocalId(id)
            .then(data => {
                    this.setState({
                        natureArea: data
                    })
                }
            );
        backend.getMetadataByNatureAreaLocalId(id)
            .then(data =>
                this.setState({
                    metadata: data
                })
            )
    }

  render() {
    return (
      <Paper>
          <Omrader areas={this.state.natureArea.areas} />
          {/*<Naturniva level={backend.NatureLevelNames[this.state.natureArea.nivå]}/>*/}
          <FactList items={[
              {id:1, secondary: 'Naturnivå', primary: backend.NatureLevelNames[this.state.natureArea.nivå]},
              {id:2, secondary: 'Kartleggingsmålestokk', primary: this.state.metadata.surveyScale},
              {id:3, secondary: 'Kartlagt', primary: this.state.metadata.surveyedFrom},
              {id:4, secondary: 'Rødlistekategori', primary: this.state.natureArea.rødlisteKategori ? this.state.natureArea.rødlisteKategori.code : ""},
              {id:5, secondary: 'Vurderingsenhet', primary: this.state.natureArea.rødlisteKategori ? this.state.natureArea.rødlisteKategori.vurderingsenhet : ""}
          ]}/>
        <Detaljer description={this.state.natureArea.description}/>
        <Kartlegging owner={this.state.metadata.owner} />
      </Paper>
    )
  }
}

export default Naturområdedetaljer
