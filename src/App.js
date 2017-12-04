import React, { Component } from 'react';
import NaturomradeDetaljer from './Naturområdedetaljer/Naturområdedetaljer'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

class App extends Component {
  render() {
    return (
      <div className="App">
          <MuiThemeProvider>
            <NaturomradeDetaljer
                natureAreaId={'3b06e6f4-402b-4844-87bc-9a7c7a872cb2'}/>
          </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
