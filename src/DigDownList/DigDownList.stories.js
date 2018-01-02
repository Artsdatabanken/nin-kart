import React from 'react';
import { storiesOf } from '@storybook/react';
import DigDownList from './DigDownList'
import {muiTheme} from 'storybook-addon-material-ui';

var dummyItems = [
    {
        "id": 1045,
        "aggreggatedCount": 494614,
        "scientificName": "Agaricomycetes",
        "popularName": null
    }];

storiesOf('DigDownList', module)
.addDecorator(muiTheme())
.add('default', () => <DigDownList items={dummyItems} />)
