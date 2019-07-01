import React, { Component } from 'react';
import './App.css';
import TrackList from './components/track-list'

class App extends Component {

  render() {
    return (
      <div className="App">
        <TrackList/>
      </div>
    );
  }
}

export default App;