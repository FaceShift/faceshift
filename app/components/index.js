/**
 * Entry point to the React application
 */
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import App from "./App/index";

// Wraps the app inside the Material Design theme
const MaterialApp = () => (
    <MuiThemeProvider>
        <App/>
    </MuiThemeProvider>
);

// for hot reloading
if (module.hot) {
    module.hot.accept();
}

// Replaces the div with the "content" id in the HTML page with React components
ReactDOM.render(<MaterialApp/>, document.getElementById('content'));
