import React from "react";
import Dropdown from "./Dropdown";
import RaisedButton from "material-ui/RaisedButton";

export const subWay = [
  {
    line: "N",
    stops: ["Times Square", "34th", "28th", "23rd", "Union Square", "8th"]
  },
  {
    line: "L",
    stops: ["8th", "6th", "Union Square", "3rd", "1st"]
  },
  {
    line: "6",
    stops: [
      "Grand Central",
      "33rd",
      "28th",
      "23rd",
      "Union Square",
      "Astor Place"
    ]
  }
];

export const SubwayContext = React.createContext(subWay);

class App extends React.Component {
  state = {
    toLine: {
      lineIndex: 0,
      line: "N"
    },
    toStation: {
      StationIndex: 0,
      station: "Time Square"
    },
    fromLine: {
      lineIndex: 0,
      line: "N"
    },
    fromStation: {
      stationIndex: 0,
      station: "Time Square"
    },
    result: null,
    travelThru: null,
    stations: null,
    changeAt: null,
    continueAt: null,
    totalStops: null,
    startDisplay: false
  };

  getStopsOnDiffLines = (fromLine, fromStation, toLine, toStation) => {
    if (
      this.state.fromLine.lineIndex === -1 ||
      this.state.toLine.lineIndex === -1
    ) {
      this.setState({
        result: `No such line!`
      });
      return;
    }

    if (
      this.state.fromStation.stationIndex === -1 ||
      this.state.toStation.StationIndex === -1
    ) {
      this.setState({
        result: `No such stop!`
      });
      return;
    }

    //Get the index of the Union Square station on the line you are from
    const unionStaIndexFromLine = subWay[
      this.state.fromLine.lineIndex
    ].stops.indexOf("Union Square");

    //Get the index of the Union Square station on the line you are transferring to
    const unionStaIndexToLine = subWay[
      this.state.toLine.lineIndex
    ].stops.indexOf("Union Square");

    //Stations you are going through on the line you are starting out from
    let travelStationsOnFrom = [];

    //Stations you are going through on the line you transfer to
    let travelStationsOnTo = [];

    //If you are travelling from left to right on the line you are starting out from
    if (this.state.fromStation.stationIndex < unionStaIndexFromLine) {
      //Put the stops in the travelStationOnFrom array
      travelStationsOnFrom = subWay[this.state.fromLine.lineIndex].stops.slice(
        this.state.fromStation.stationIndex + 1,
        unionStaIndexFromLine + 1
      );
    } else {
      //If travelling from right to left, put the stops in reverse order in the travelStationOnFrom array
      travelStationsOnFrom = subWay[this.state.fromLine.lineIndex].stops
        .slice(unionStaIndexFromLine, this.state.fromStation.stationIndex)
        .reverse();
    }

    //Apply the same logic from above to the stops on the destination line, and put the stops in the travelStationsOnTo array
    if (this.state.toStation.StationIndex < unionStaIndexToLine) {
      travelStationsOnTo = subWay[this.state.toLine.lineIndex].stops
        .slice(this.state.toStation.StationIndex, unionStaIndexToLine)
        .reverse();
    } else {
      travelStationsOnTo = subWay[this.state.toLine.lineIndex].stops.slice(
        unionStaIndexToLine,
        this.state.toStation.StationIndex
      );
    }

    //If the user enters Union Square as the destination stop but on a different line, just exit the app with a waining message
    if (this.state.toStation.stationIndex === unionStaIndexToLine) {
      this.setState({
        result: `Why would you want to do that?!`
      });
      return;
    }

    //Otherwise, just console.log the message telling user his/her travel information
    this.setState({
      result: `You must travel through the following stops on the ${fromLine} line: `,
      travelThru: `${travelStationsOnFrom.join(", ")}.`,
      changeAt: `Change at Union Square.`,
      continueAt: `Your journey continues through the following stops: ${travelStationsOnTo.join(
        ", "
      )}.`,
      totalStops: `${travelStationsOnFrom.length +
        travelStationsOnTo.length} stops in total.`
    });
  };

  getStopsOnSameLine = (line, fromStation, toStation) => {
    // If entered line doesn't exist, exit the app with warning message
    if (this.state.fromLine.lineIndex === -1) {
      this.setState({
        result: `No such line!`
      });
      return;
    }

    //Check if the fromStation or toStation exist on the line, if not, exit the app with the warning message
    if (
      this.state.fromStation.stationIndex === -1 ||
      this.state.toStation.stationIndex === -1
    ) {
      this.setState({
        result: `No such stop!`
      });
      return;
    }

    if (fromStation === toStation) {
      this.setState({
        result: `Just go home..`
      });
      return;
    }

    //Checking the direction you are travelling to (from left to right in the array or the other way around)
    //If travelling from left to right in the stops array
    if (
      this.state.fromStation.stationIndex < this.state.toStation.stationIndex
    ) {
      //Slice out the stops from the stops array (excluding the starting station) and store it in a new travelStations array
      const travelStations = subWay[this.state.fromLine.lineIndex].stops.slice(
        this.state.fromStation.stationIndex + 1,
        this.state.toStation.stationIndex + 1
      );
      //Console log the travel info
      this.setState({
        result: `You must travel through the following stops on the ${line} line: `,
        travelThru: `${travelStations.join(", ")}.`,
        totalStops: `Total of ${travelStations.length} stops.`
      });
    } else {
      //If travelling from right to left in the stops array

      const travelStations = subWay[this.state.fromLine.lineIndex].stops.slice(
        this.state.toStation.stationIndex,
        this.state.fromStation.stationIndex
      );

      //console log the travelStations array in the reverse order
      this.setState({
        result: `You must travel through the following stops on the ${line} line: `,
        travelThru: `${travelStations.reverse().join(", ")}.`,
        totalStops: `Total of ${travelStations.length} stops.`
      });
    }
  };

  planTrip = (fromLine, fromStation, toLine, toStation) => {
    if (fromLine === toLine) {
      this.getStopsOnSameLine(fromLine, fromStation, toStation);
    } else {
      this.getStopsOnDiffLines(fromLine, fromStation, toLine, toStation);
    }
  };

  checkRoute = () => {
    const { fromLine, fromStation, toLine, toStation } = this.state;

    this.planTrip(
      fromLine.line,
      fromStation.station,
      toLine.line,
      toStation.station
    );

    this.setState({
      startDisplay: true
    });
  };

  setFromLine = fromLineIndex => {
    this.setState({
      fromLine: {
        lineIndex: fromLineIndex,
        line: subWay[fromLineIndex].line
      }
    });
  };

  setFromSta = fromStationIndex => {
    this.setState({
      fromStation: {
        stationIndex: fromStationIndex,
        station: subWay[this.state.fromLine.lineIndex].stops[fromStationIndex]
      }
    });
  };

  setToLine = toLineLineIndex => {
    this.setState({
      toLine: {
        lineIndex: toLineLineIndex,
        line: subWay[toLineLineIndex].line
      }
    });
  };

  setToSta = toStationIndex => {
    this.setState({
      toStation: {
        stationIndex: toStationIndex,
        station: subWay[this.state.toLine.lineIndex].stops[toStationIndex]
      }
    });
  };

  resetDisplay = () => {
    this.setState({
      startDisplay: false
    });
  };

  delayReset = () => {
    setTimeout(this.resetDisplay, 10000);
  };

  render() {
    return (
      <SubwayContext.Provider value={subWay}>
        <div style={style.main}>
          <h2>From: </h2>
          <Dropdown
            name="start"
            setFromLine={this.setFromLine}
            setFromSta={this.setFromSta}
          />
          <h2>To: </h2>
          <Dropdown
            name="destination"
            setToLine={this.setToLine}
            setToSta={this.setToSta}
          />
          <RaisedButton
            label="Check route"
            primary={true}
            onClick={this.checkRoute}
            style={{ margin: "12px" }}
          />
          
              <div style={style.main}>
                <p>{this.state.result}</p>
                <p>{this.state.travelThru}</p>
                {this.state.changeAt && <p>{this.state.changeAt}</p>}
                {this.state.continueAt && <p>{this.state.continueAt}</p>}
                {this.state.totalStops && <p>{this.state.totalStops}</p>}
              </div>
            
        </div>
      </SubwayContext.Provider>
    );
  }
}

export default App;

const style = {
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
};
