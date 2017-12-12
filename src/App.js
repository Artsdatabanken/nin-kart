import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import NatureAreaDetailContainer from './Naturområdedetaljer/NatureAreaDetailContainer'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import FilterTreeContainer from './FilterTree/FilterTreeContainer'
import StepSliderContainer from './Components/StepSliderContainer'
import RangeSliderContainer from './Components/RangeSliderContainer'

class App extends Component {
    render() {
        return (
            <div className="App">
                <MuiThemeProvider>
                    <BrowserRouter>
                        <Switch>
                            <Route path="/tree" exact component={FilterTreeContainer} />
                            <Route path="/details" exact
                                   render={() => <NatureAreaDetailContainer
                                       natureAreaId={'3b06e6f4-402b-4844-87bc-9a7c7a872cb2'}/>} />
                            <Route path="/range" exact
                                   render={() => <div><StepSliderContainer/>
                                       <RangeSliderContainer /></div>} />
                            <Route component={RedirectToDefault} />
                        </Switch>
                    </BrowserRouter>
                </MuiThemeProvider>
            </div>
        );
    }
}

const RedirectToDefault = () => <Redirect from="/" to="/tree" />;

export default App;