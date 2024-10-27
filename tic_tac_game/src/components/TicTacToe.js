import React, { useState, useEffect } from 'react';
import Square from './Square';
import moveSound from '../assets/move.wav';
import winSound from '../assets/win.wav';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0 });
  const winner = calculateWinner(board);
  const winningCombination = getWinningCombination(board);

  const handleClick = (index) => {
    if (board[index] || winner) return; 
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    // Play sound effect for the move
    const audio = new Audio(moveSound);
    audio.play();
  };

  const resetGame = () => {
    if (winner) {
      // Increment the score for winner
      setScore((prevScore) => ({
        ...prevScore,
        [winner]: prevScore[winner] + 1,
      }));
    }
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const renderSquare = (index) => (
    <Square
      value={board[index]}
      onClick={() => handleClick(index)}
      className={winningCombination && winningCombination.includes(index) ? 'highlight' : ''}
    />
  );

  useEffect(() => {
    if (winner) {
      const audio = new Audio(winSound);
      audio.play(); // sound effect for winning
    }
  }, [winner]);

  return (
    <div className="game">
      <div className="status">
        {winner ? `Winner: ${winner}` : `Next player: ${isXNext ? 'X' : 'O'}`}
      </div>
      <div className="scoreboard">
        <div>X: {score.X}</div>
        <div>O: {score.O}</div>
      </div>
      <div className="board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

// functio tocalculate the winner
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

//function to get the winning combination
const getWinningCombination = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }
  }
  return null;
};

export default TicTacToe;
