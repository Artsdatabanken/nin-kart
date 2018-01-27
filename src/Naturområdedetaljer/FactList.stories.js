import React from 'react';
import { storiesOf } from '@storybook/react';
import FactList from './FactList'
import {muiTheme} from 'storybook-addon-material-ui';

const dummyItems = [
    {
        "id": 1,
        "primary": "Canis Lupus",
        "secondary": "Ulv"
    },
    {
        "id": 2,
        "primary": "Ovis aries",
        "secondary": "Sau"
    }];

storiesOf('FactList', module)
.addDecorator(muiTheme())
.add('default', () => <FactList items={dummyItems} />)
