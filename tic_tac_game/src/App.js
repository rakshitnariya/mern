import React from 'react';
import TicTacToe from './components/TicTacToe';
import './styles/styles.css';

const App = () => {
  return (
    <div className="app-container">
      <h1>Tic Tac Toe</h1>
      <TicTacToe />
    </div>
  );
};

export default App;
