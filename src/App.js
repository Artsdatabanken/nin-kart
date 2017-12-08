import React, { Component } from 'react';
import NatureAreaDetailContainer from './Naturområdedetaljer/NatureAreaDetailContainer'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import FilterTreeContainer from './FilterTree/FilterTreeContainer'
import StepSliderContainer from './Components/StepSliderContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
          <MuiThemeProvider>
              <div>
                  <FilterTreeContainer/>
                  <NatureAreaDetailContainer
                    natureAreaId={'3b06e6f4-402b-4844-87bc-9a7c7a872cb2'}/>
                  <StepSliderContainer/>

              </div>
          </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
