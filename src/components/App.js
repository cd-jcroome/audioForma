import React from "react";
import { OAuth } from "./oAuth";
import SpotifyFetch from "../actions/spotifyFetch";
import Bubble from "./Bubble";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>AudioForma</h1>
        {window.location.hash ? (
          <React.Fragment>
            <Bubble />
          </React.Fragment>
        ) : (
          <OAuth />
        )}
      </React.Fragment>
    );
  }
}

export default App;
