import React, { Component } from 'react';
import Map from './Map.js'
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">         
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Map/>
      </div>
    );
  }
}
export default App;