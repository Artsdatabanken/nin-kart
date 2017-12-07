import React, { Component } from 'react'
import backend from '../backend'
import NatureAreaDetails from './NatureAreaDetails'

class NatureAreaDetailContainer extends Component {
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
            <NatureAreaDetails
                natureArea={this.state.natureArea}
                metadata={this.state.metadata}
            />
        )
    }
}

export default NatureAreaDetailContainer
