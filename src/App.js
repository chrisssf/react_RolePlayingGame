import './App.css';
import React from 'react';

import GameScreen from './screens/GameScreen'


function App() {
  return (
    <div className="App">
      <p>React RPG!!!</p>
      <p style={{color: "white", backgroundColor: "red"}}>Game still in development but IS playable, all features described are fully functional however additional features and styling are still to be added</p>
      <GameScreen />
    </div>
  );
}

export default App;
