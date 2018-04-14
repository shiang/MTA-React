import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";

const muiTheme = getMuiTheme({
  datePicker: {
    selectColor: "#5C67E1"
  },
  flatButton: { primaryTextColor: "#5C67E1" }
});

const Root = () => {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
      <App />
    </MuiThemeProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
