import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import App from "./App/index";

const MaterialApp = () => (
  <MuiThemeProvider>
    <App/>
  </MuiThemeProvider>
);

// for hot reloading
if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(<MaterialApp/>, document.getElementById('content'));
