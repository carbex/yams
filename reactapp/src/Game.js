import React, { useEffect, useState } from 'react';
import Dice from './Dice'
import Box from './Box'
import './App.css';
import { Table, Alert } from 'reactstrap';
import { faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';

function Game(props) {

  const fas = [faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix]

  // -------------- Etats -------------- //

  const [numbersRandom, setNumbersRandom] = useState([
    { value: null, state: false },
    { value: null, state: false },
    { value: null, state: false },
    { value: null, state: false },
    { value: null, state: false }
  ])
  const [boxes, setBoxes] = useState([])
  const [count, setCount] = useState(0)
  const [somme, setSomme] = useState()
  const [message, setMessage] = useState()
  const [gameTitle, setGameTitle] = useState('')
  const [turn, setTurn] = useState(0)
  const [error, setError] = useState()

  // ------------ UseEffect ------------ //

  useEffect(() => {
    const buildBoxes = () => {
      if (Object.keys(props.playersToDisplay).length !== 0) {
        const players = Object.values(props.playersToDisplay)
        let temp = []
        players.forEach(player => {
          temp.push([null, null, null, null, null, null, null, null, null, null, null, null, player])
        })
        setBoxes(temp)
      } else if (Object.keys(props.game).length !== 0) {
        const players = Object.values(props.game.players)
        let temp = []
        players.forEach(player => {
          temp.push([
            player.one,
            player.two,
            player.three,
            player.four,
            player.five,
            player.six,
            player.max,
            player.min,
            player.suite,
            player.full,
            player.square,
            player.yam,
            player.playerId
          ])
        })
        setBoxes(temp)
        setTurn(props.game.turn)
        setGameTitle(props.game.title)
      }
    }
    buildBoxes()
  }, [])

  useEffect(() => {
    const inviteToPlay = () => {
      if (Object.keys(props.playersToDisplay).length !== 0) {
        const players = Object.values(props.playersToDisplay)
        if (count === 0) {
          setMessage(
            <div className="alert alert-success w-100">
              C'est à {players[turn]} de jouer !!!
            </div>
          )
        }
      } else if (Object.keys(props.game).length !== 0) {
        const players = Object.values(props.game.players)
        if (count === 0) {
          setMessage(
            <div className="alert alert-success w-100">
              C'est à {players[turn].playerId} de jouer !!!
            </div>
          )
        }
      }
    }
    inviteToPlay()
  }, [turn])

  // ------------- Fonctions ------------ //

  let handleClickOnBox = async (i, j) => {
    let boxesArray = [...boxes]
    let numbersRandomSort = numbersRandom.map((e) => e.value).sort()
    if (j === 0) {
      let oneTotal = 0
      numbersRandomSort.forEach((e) => {
        if (e === 1) {
          oneTotal++
        }
      })
      boxesArray[i][j] = oneTotal
    } else if (j === 1) {
      let twoTotal = 0
      numbersRandomSort.forEach((e) => {
        if (e === 2) {
          twoTotal += e
        }
      })
      boxesArray[i][j] = twoTotal
    } else if (j === 2) {
      let threeTotal = 0
      numbersRandomSort.forEach((e) => {
        if (e === 3) {
          threeTotal += e
        }
      })
      boxesArray[i][j] = threeTotal
    } else if (j === 3) {
      let fourTotal = 0
      numbersRandomSort.forEach((e) => {
        if (e === 4) {
          fourTotal += e
        }
      })
      boxesArray[i][j] = fourTotal
    } else if (j === 4) {
      let fiveTotal = 0
      numbersRandomSort.forEach((e) => {
        if (e === 5) {
          fiveTotal += e
        }
      })
      boxesArray[i][j] = fiveTotal
    } else if (j === 5) {
      let sixTotal = 0
      numbersRandomSort.forEach((e) => {
        if (e === 6) {
          sixTotal += e
        }
      })
      boxesArray[i][j] = sixTotal
    } else if (j === 6 || j === 7) {
      if (somme) {
        boxesArray[i][j] = somme
      } else {
        boxesArray[i][j] = 0
      }
    } else if (j === 8) {
      let suite = 0
      if (numbersRandomSort[0] < numbersRandomSort[1] && numbersRandomSort[1] < numbersRandomSort[2] && numbersRandomSort[2] < numbersRandomSort[3] && numbersRandomSort[3] < numbersRandomSort[4]) {
        suite = 40
      }
      boxesArray[i][j] = suite
    } else if (j === 9) {
      let full = 0
      if (numbersRandomSort[0] !== null && numbersRandomSort[1] !== null && numbersRandomSort[2] !== null && numbersRandomSort[3] !== null && numbersRandomSort[4] !== null) {
        if ((numbersRandomSort[0] === numbersRandomSort[1] && numbersRandomSort[1] === numbersRandomSort[2] && numbersRandomSort[3] === numbersRandomSort[4]) || (numbersRandomSort[0] === numbersRandomSort[1] && numbersRandomSort[2] === numbersRandomSort[3] && numbersRandomSort[3] === numbersRandomSort[4])) {
          full = 25
        }
      }
      boxesArray[i][j] = full
    } else if (j === 10) {
      let square = 0
      if (numbersRandomSort[0] !== null && numbersRandomSort[1] !== null && numbersRandomSort[2] !== null && numbersRandomSort[3] !== null && numbersRandomSort[4] !== null) {
        if ((numbersRandomSort[0] === numbersRandomSort[1] && numbersRandomSort[1] === numbersRandomSort[2] && numbersRandomSort[2] === numbersRandomSort[3]) || (numbersRandomSort[1] === numbersRandomSort[2] && numbersRandomSort[2] === numbersRandomSort[3] && numbersRandomSort[3] === numbersRandomSort[4])) {
          numbersRandomSort.forEach((e) => square += e)
        }
      }
      boxesArray[i][j] = square
    } else if (j === 11) {
      let yam = 0
      let result = 0
      numbersRandomSort.forEach((e) => result += e)
      if (result === 30) {
        yam = 50
      }
      boxesArray[i][j] = yam
    } else {
      boxesArray[i][j] = 0
    }

    setBoxes(boxesArray)
    setCount(0)
    setSomme()
    setNumbersRandom([
      { value: null, state: false },
      { value: null, state: false },
      { value: null, state: false },
      { value: null, state: false },
      { value: null, state: false }
    ])
    setMessage()

    if (turn < boxesArray.length - 1) {
      setTurn(() => turn + 1)
    } else {
      setTurn(0)
    }
  }

  let handleClickOnSaveGrid = async () => {
    let boxesObject = boxes.map((player, i) => {
      return {
        playerId: player[12],
        one: player[0],
        two: player[1],
        three: player[2],
        four: player[3],
        five: player[4],
        six: player[5],
        max: player[6],
        min: player[7],
        suite: player[8],
        full: player[9],
        square: player[10],
        yam: player[11]
      }
    })
    let temp = {
      turn: turn,
      title: gameTitle,
      players: boxesObject
    }
    var rawResponse = await fetch('/add-game', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(temp)
    })
    var response = await rawResponse.json()
    if (response.result) {
      setError(
        <div className="alert alert-success w-100">
          {response.message}
        </div>
      )
      setTimeout(() => setError(), 5000)
    } else {
      setError(
        <div className="alert alert-danger w-100">
          {response.message}
        </div>
      )
      setTimeout(() => setError(), 5000)
    }
  }

  let handleClickOnEraseGrid = async () => {
    let temp = []
    boxes.forEach(player => {
      temp.push([null, null, null, null, null, null, null, null, null, null, null, null, player[12]])
    })
    setBoxes(temp)
    setGameTitle('')
    setError()
    setTurn(0)
  }


  let handleClickOnDice = (i) => {
    if (count < 3) {
      let numbersRandomArray = [...numbersRandom]
      numbersRandomArray[i].state === false ? numbersRandomArray[i].state = true : numbersRandomArray[i].state = false

      setNumbersRandom(numbersRandomArray)
    }
  }

  let handleClickOnButton = () => {

    if (count < 3) {
      var somme = 0
      let numbers = []
      for (let i = 0; i < 5; i++) {
        numbersRandom[i].state === false ? numbers.push({ value: Math.floor((Math.random() * 6) + 1), state: false }) : numbers.push({ value: numbersRandom[i].value, state: false })
        somme += numbers[i].value
      }

      setCount(count + 1)
      setNumbersRandom(numbers)
      setSomme(somme)

      if (somme !== 30) {
        if (count < 2) {
          setMessage(
            <div className="alert alert-success w-100">
              Selectionnez les dés que vous NE voulez PAS relancer puis relancez, ou choisissez une case (somme = {somme}) (il vous reste {2 - count} lancers)
            </div>
          )
        } else if (count < 3) {
          setMessage(
            <Alert color="danger" className="w-100">
              Vous ne pouvez plus relancer les dés, choisissez une case (somme = {somme})
            </Alert>
          )
        }
      } else {
        setMessage(
          <Alert color="warning" className="w-100">
            !!!!!!!!!!!!!! Yams !!!!!!!!!!!!!!!!
          </Alert>
        )
      }
    }
  }

  // ---------- Dice map -------- //

  let diceList = numbersRandom.map((number, i) => {
    return <Dice key={i} handleClickOnDiceParent={handleClickOnDice} selected={number.state} index={i} faDiceNumber={fas[number.value - 1]} />;
  })

  // ---------- Boxes map -------- //

  let tHeadList = boxes.map((player, i) => {
    let style = { textAlign: 'center', fontWeight: 'bold' }
    if (turn === i) {
      style = { textAlign: 'center', fontWeight: 'bold', color: 'green' }
    }
    return <th key={i} style={style}>{player[12]}</th>
  })

  let asRow = boxes.map((player, i) => {
    return <Box handleClickOnBoxParent={handleClickOnBox} indexI={i} indexJ={0} value={player[0]} turn={turn} />
  })

  let twoRow = boxes.map((player, i) => {
    return <Box handleClickOnBoxParent={handleClickOnBox} indexI={i} indexJ={1} value={player[1]} turn={turn} />
  })

  let threeRow = boxes.map((player, i) => {
    return <Box handleClickOnBoxParent={handleClickOnBox} indexI={i} indexJ={2} value={player[2]} turn={turn} />
  })

  let fourRow = boxes.map((player, i) => {
    return <Box handleClickOnBoxParent={handleClickOnBox} indexI={i} indexJ={3} value={player[3]} turn={turn} />
  })

  let fiveRow = boxes.map((player, i) => {
    return <Box handleClickOnBoxParent={handleClickOnBox} indexI={i} indexJ={4} value={player[4]} turn={turn} />
  })

  let sixRow = boxes.map((player, i) => {
    return <Box handleClickOnBoxParent={handleClickOnBox} indexI={i} indexJ={5} value={player[5]} turn={turn} />
  })

  let maxRow = boxes.map((player, i) => {
    return <Box handleClickOnBoxParent={handleClickOnBox} indexI={i} indexJ={6} value={player[6]} turn={turn} />
  })

  let minRow = boxes.map((player, i) => {
    return <Box handleClickOnBoxParent={handleClickOnBox} indexI={i} indexJ={7} value={player[7]} turn={turn} />
  })
  let suiteRow = boxes.map((player, i) => {
    return <Box handleClickOnBoxParent={handleClickOnBox} indexI={i} indexJ={8} value={player[8]} turn={turn} />
  })
  let fullRow = boxes.map((player, i) => {
    return <Box handleClickOnBoxParent={handleClickOnBox} indexI={i} indexJ={9} value={player[9]} turn={turn} />
  })
  let squareRow = boxes.map((player, i) => {
    return <Box handleClickOnBoxParent={handleClickOnBox} indexI={i} indexJ={10} value={player[10]} turn={turn} />
  })
  let yamRow = boxes.map((player, i) => {
    return <Box handleClickOnBoxParent={handleClickOnBox} indexI={i} indexJ={11} value={player[11]} turn={turn} />
  })

  // ------------ Total --------------- //

  let total = []
  for (let i = 0; i < boxes.length; i++) {
    total[i] = boxes[i][0] + boxes[i][1] + boxes[i][2] + boxes[i][3] + boxes[i][4] + boxes[i][5]
  }

  let totalRow = total.map((total) => {
    return <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{total}</td>
  })

  // ------------ Bonus --------------- //

  let bonus = []
  for (let i = 0; i < boxes.length; i++) {
    if (total[i] && total[i] > 63) {
      bonus[i] = 35
    } else {
      bonus[i] = 0
    }
  }

  let bonusRow = bonus.map(bonus => {
    return <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{bonus}</td>
  })

  // ------------ Total I --------------- //

  let totalOne = []
  for (let i = 0; i < boxes.length; i++) {
    if (total[i]) {
      if (bonus[i]) {
        totalOne[i] = total[i] + bonus[i]
      } else {
        totalOne[i] = total[i] + 0
      }
    } else {
      totalOne[i] = 0
    }
  }

  let totalOneRow = totalOne.map((total, i) => {
    return <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{total}</td>
  })

  // ------------ Total II ------------ //

  let totalTwo = []
  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i][6] && boxes[i][7]) {
      totalTwo[i] = boxes[i][6] - boxes[i][7]
    } else if (!boxes[i][6] || !boxes[i][7]) {
      totalTwo[i] = 0
    }
  }

  let totalTwoRow = totalTwo.map((total, i) => {
    return <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{total}</td>
  })

  // ------------ Total III ------------ //

  let totalThree = []
  for (let i = 0; i < boxes.length; i++) {
    totalThree[i] = boxes[i][8] + boxes[i][9] + boxes[i][10] + boxes[i][11]
  }

  let totalThreeRow = totalThree.map((total, i) => {
    return <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{total}</td>
  })

  // ------------ Total I + II + II ------------ //

  let totalFour = []
  for (let i = 0; i < boxes.length; i++) {
    totalFour[i] = parseInt(totalOne[i]) + parseInt(totalTwo[i]) + parseInt(totalThree[i])
  }

  let totalFourRow = totalFour.map((total, i) => {
    return <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{total}</td>
  })

  return (
    <>

      <div className="container d-flex justify-content-center align-items-center" style={{ height: '40vh' }}>
        <div className="row w-100">
          <div className="col-12 p-4">
            <div className="d-flex justify-content-center flex-wrap">
              {diceList}
            </div>
          </div>
        </div>
      </div>

      <div className="container d-flex justify-content-center">
        <div className="row w-100">
          <div className="col-12 p-4 d-flex flex-column justify-content-center align-items-center">
            <h6 className="w-100 text-center">{message}</h6>
            <button className="btn btn-primary w-100" onClick={() => handleClickOnButton()}>Lancer les dés</button>
          </div>
        </div>
      </div>

      <div className="container d-flex justify-content-center">
        <div className="row w-100">
          <div className="col-12 p-4">
            <label htmlFor='title'>Titre</label>
            <input
              name='titre'
              id='titre'
              placeholder="Titre de la partie"
              className="form-control w-100"
              onChange={(e) => setGameTitle(e.target.value)}
              value={gameTitle}
            />
          </div>
        </div>
      </div>

      <div className="container d-flex justify-content-center">
        <div className="row w-100">
          <div className="col-12 px-4 d-flex justify-content-center">
            <Table bordered size="sm" responsive striped className='bg-light'>
              <thead>
                <tr>
                  <th></th>
                  {tHeadList}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">As</th>
                  {asRow}
                </tr>
                <tr>
                  <th scope="row">Deux</th>
                  {twoRow}
                </tr>
                <tr>
                  <th scope="row">Trois</th>
                  {threeRow}
                </tr>
                <tr>
                  <th scope="row">Quatre</th>
                  {fourRow}
                </tr>
                <tr>
                  <th scope="row">Cinq</th>
                  {fiveRow}
                </tr>
                <tr>
                  <th scope="row">Six</th>
                  {sixRow}
                </tr>
                <tr>
                  <th scope="row">Total</th>
                  {totalRow}
                </tr>
                <tr>
                  <th scope="row">Bonus</th>
                  {bonusRow}
                </tr>
                <tr>
                  <th scope="row">Total I</th>
                  {totalOneRow}
                </tr>
                <tr>
                  <th scope="row">Plus</th>
                  {maxRow}
                </tr>
                <tr>
                  <th scope="row">Moins</th>
                  {minRow}
                </tr>
                <tr>
                  <th scope="row">Total II</th>
                  {totalTwoRow}
                </tr>
                <tr>
                  <th scope="row">Suite</th>
                  {suiteRow}
                </tr>
                <tr>
                  <th scope="row">Full</th>
                  {fullRow}
                </tr>
                <tr>
                  <th scope="row">Carré</th>
                  {squareRow}
                </tr>
                <tr>
                  <th scope="row">Yam</th>
                  {yamRow}
                </tr>
                <tr>
                  <th scope="row">Total III</th>
                  {totalThreeRow}
                </tr>
                <tr>
                  <th scope="row">Total I + II + III</th>
                  {totalFourRow}
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th></th>
                  {tHeadList}
                </tr>
              </tfoot>
            </Table>
          </div>



        </div>
      </div>

      <div className="container d-flex justify-content-center">
        <div className="row w-100">
          <div className="col-12 px-4 d-flex flex-column justify-content-center align-items-center">
            <h6 className="w-100 text-center">{error}</h6>
          </div>
          <div className="col-12 px-4 pb-4 d-flex justify-content-end">
            <button className="btn btn-primary mr-2" onClick={() => handleClickOnSaveGrid()}>Enregistrer la partie</button>
            <button className="btn btn-success" onClick={() => handleClickOnEraseGrid()}>Nouvelle partie</button>
          </div>
        </div>
      </div>

    </>

  );
}

function mapStateToProps(state) {
  return {
    playersToDisplay: state.players,
    game: state.game
  }
}

export default connect(
  mapStateToProps,
  null
)(Game)


