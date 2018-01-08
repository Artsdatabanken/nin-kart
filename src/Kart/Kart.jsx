import Mapbox from './Mapbox/Mapbox'
import NatureAreaDetails from '../Naturområdedetaljer/NatureAreaDetails'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import React, { Component } from 'react';
import backend from "../backend";

class Kart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            natureArea: "",
            metadata: "",
            open: false,
        }
    }

    onClick = point => {
        let localId = "";
        if (point.features && point.features[0] && point.features[0].properties && point.features[0].properties.localId) {
            localId = point.features[0].properties.localId;
            this.goFetch(localId);
            this.setState({open: true});
        }
        //alert(point.lngLat + "\n" + localId)
    };

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
    handleToggle = () => this.setState({open: !this.state.open});

    render() {
        return (
            <MuiThemeProvider>
            <div>
                <Mapbox {...this.props}
                        onClick={this.onClick}
                        handleToggle={this.handleToggle}
                />
                <Drawer open={this.state.open}>
                    <MenuItem onClick={this.handleToggle}>Lukk</MenuItem>
                    <NatureAreaDetails
                        natureArea={this.state.natureArea}
                        metadata={this.state.metadata}
                    />
                </Drawer>
            </div>
            </MuiThemeProvider>
        );
    }
}

export default Kart;