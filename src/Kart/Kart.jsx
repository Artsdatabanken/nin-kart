import Mapbox from './Mapbox/Kart'

import React, { Component } from 'react';

class Kart extends Component {
    render() {
        return (
            <div>
                <Mapbox {...props} />
            </div>
        );
    }
}

export default Kart;