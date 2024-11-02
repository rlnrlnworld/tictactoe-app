import { useState } from "react";
import Board from "./components/Board";
import './App.css'

function App(){
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null) }
  ])
  const [xIsNext, setXIsNext] = useState(true)
  const [stepNumber, setStepNumber] = useState(0)

  const calcWinner = (squares) => {
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]
    for (let i=0; i<lines.length; i++) {
      const [a, b, c] = lines[i]
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  const current = history[stepNumber]
  const winner = calcWinner(current.squares)
  let status
  if (winner) {
    status = 'Winner: '+ winner
  } else {
    status = `Now Player: ${xIsNext ? 'X' : 'O'}`
  }

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber+1)
    const newCurrent = newHistory[newHistory.length-1]
    const newSquares = newCurrent.squares.slice();

    // 이미 승리했거나, 보드가 다 채워졌을 경우 핸들러 무시
    if (calcWinner(newSquares) || newSquares[i]) {
      return
    }

    newSquares[i] = xIsNext ? 'X' : 'O'
    setHistory([...newHistory, { squares: newSquares }])
    setXIsNext(current => !current)

    setStepNumber(newHistory.length)
  }

  const moves = history.map((step, move)=>{
    const desc = move ? 'Go To Move #' +move : 'Go To Game Start'
    return (
      <li key={move}>
        <button className="move-button" onClick={() => jumpTo(move)}>
          {desc}
        </button>
      </li>
    )

  })

  const jumpTo = (step) => {
    setStepNumber(step)
    setXIsNext((step % 2) === 0)
  }

  return (
    <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(i)=>handleClick(i)}/>
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol style={{ listStyle: "none" }}>{moves}</ol>
        </div>
    </div>
  );
}

export default App;
