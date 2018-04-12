import React from "react";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import { SubwayContext } from "./App";

const styles = {
  customWidth: {
    width: 250
  }
};

class Destination extends React.Component {
  state = {
    value: 0,
    value2: 0
  };

  handleChangeLine = (event, index, value) => {
    this.setState({ value });
    this.props.setToLine(value);
  };
  handleChangeStop = (event, index, value) => {
    this.setState({ value2: value });
    this.props.setToSta(value);
  };

  render() {
    return (
      <SubwayContext.Consumer>
        {subway => (
          <React.Fragment>
            <DropDownMenu
              value={this.state.value}
              onChange={this.handleChangeLine}
              style={styles.customWidth}
              autoWidth={false}
            >
              {subway.map((line, i) => {
                return <MenuItem key={i} value={i} primaryText={line.line} />;
              })}
            </DropDownMenu>
            <DropDownMenu
              value={this.state.value2}
              onChange={this.handleChangeStop}
              style={styles.customWidth}
              autoWidth={false}
            >
              {subway[this.state.value].stops.map((stop, i) => {
                return <MenuItem key={i} value={i} primaryText={stop} />;
              })}
            </DropDownMenu>
          </React.Fragment>
        )}
      </SubwayContext.Consumer>
    );
  }
}

export default Destination;
