import Mapbox from './Mapbox/Mapbox'

import React, { Component } from 'react';

class Kart extends Component {
    render() {
        return (
            <div>
                <Mapbox {...this.props} />
            </div>
        );
    }
}

export default Kart;