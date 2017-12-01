import React, { Component } from 'react';
import NaturomradeDetaljer from './Naturområdedetaljer/Naturområdedetaljer'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

class App extends Component {
  render() {
    return (
      <div className="App">
          <MuiThemeProvider>
            <NaturomradeDetaljer
                natureAreaId={'3e9bdc8b-3b7a-490c-bac6-ac5d3b0ccf27'}/>
          </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
