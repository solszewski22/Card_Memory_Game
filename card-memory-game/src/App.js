import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Home from './Pages/Home.js';
import Winner from './Pages/Winner.js';
import Loser from './Pages/Loser.js';
import Game from './Pages/Game.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {cards : []};
  }

  async componentDidMount() {
    try {
      const response = await fetch('/allCards');

      if(response.ok){
        const allCards = await response.json();
        this.setState({cards : allCards});
      }
      else {
        console.log("Error with the response data");
      }
    }
    catch(err) {
      console.log("Error retrieving the cards.");
      console.log(err);
    }
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Home headerTitle="Card Memory Game" btnTitle="Play" />} />
          <Route path="/play" element={<Game cards={this.state.cards} />} />
          <Route path="/game-over-winner" element={<Winner />}/>
          <Route path="/game-over-loser" element={<Loser />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
