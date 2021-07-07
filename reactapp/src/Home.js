import React, { useState } from 'react';
import './App.css';
import { Button, InputGroup, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

function Home(props) {

    const [playerOne, setPlayerOne] = useState('')
    const [playerTwo, setPlayerTwo] = useState('')
    const [playerThree, setPlayerThree] = useState('')
    const [playerFour, setPlayerFour] = useState('')
    const [playerFive, setPlayerFive] = useState('')
    const [playerSix, setPlayerSix] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [gameTitle, setGameTitle] = useState()

    const addPlayers = () => {
        let players = {}
        if (playerOne) {
            players.playerOne = playerOne
        }
        if (playerTwo) {
            players.playerTwo = playerTwo
        }
        if (playerThree) {
            players.playerThree = playerThree
        }
        if (playerFour) {
            players.playerFour = playerFour
        }
        if (playerFive) {
            players.playerFive = playerFive
        }
        if (playerSix) {
            players.playerSix = playerSix
        }
        props.addPlayers(players)
        setRedirect(true)
    }

    const addGame = async () => {
        const responseJson = await fetch(`/get-game?title=${gameTitle}`)
        const arrayOfObject = await responseJson.json()
        props.addGame(arrayOfObject.game)
        setRedirect(true)
    }

    if (redirect) {
        return (<Redirect to='/game' />)
    }


    return (
        <div className="container d-flex justify-content-center align-items-start" style={{ height: '100vh' }}>
            <div className="row">

                <div className="col-12 pb-4">
                    <h2>Veuillez sélectionner les joueurs</h2>
                </div>

                <div className="col-12 col-md-6 col-lg-4 pb-4">
                    <InputGroup>
                        <Input type='text'
                            className="Login-input"
                            placeholder="player 1"
                            onChange={(e) => setPlayerOne(e.target.value)}
                            value={playerOne}
                        />
                    </InputGroup>
                </div>

                <div className="col-12 col-md-6 col-lg-4 pb-4">
                    <InputGroup>
                        <Input type='text'
                            className="Login-input"
                            placeholder="player 2"
                            onChange={(e) => setPlayerTwo(e.target.value)}
                            value={playerTwo}
                        />
                    </InputGroup>
                </div>

                <div className="col-12 col-md-6 col-lg-4 pb-4">
                    <InputGroup>
                        <Input type='text'
                            className="Login-input"
                            placeholder="player 3"
                            onChange={(e) => setPlayerThree(e.target.value)}
                            value={playerThree}
                        />
                    </InputGroup>
                </div>

                <div className="col-12 col-md-6 col-lg-4 pb-4">
                    <InputGroup>
                        <Input type='text'
                            className="Login-input"
                            placeholder="player 4"
                            onChange={(e) => setPlayerFour(e.target.value)}
                            value={playerFour}
                        />
                    </InputGroup>
                </div>

                <div className="col-12 col-md-6 col-lg-4 pb-4">
                    <InputGroup>
                        <Input type='text'
                            className="Login-input"
                            placeholder="player 5"
                            onChange={(e) => setPlayerFive(e.target.value)}
                            value={playerFive}
                        />
                    </InputGroup>
                </div>

                <div className="col-12 col-md-6 col-lg-4 pb-4">
                    <InputGroup>
                        <Input type='text'
                            className="Login-input"
                            placeholder="player 6"
                            onChange={(e) => setPlayerSix(e.target.value)}
                            value={playerSix}
                        />
                    </InputGroup>
                </div>

                <div className="col-12 pb-4 d-flex justify-content-between">
                    <Button color="primary" style={{ width: '100%' }} onClick={() => addPlayers()}>Ajouter les joueurs</Button>
                </div>

                <div className="col-12 pb-4">
                    <h2>Ou chargez une de vos parties sauvegardées</h2>
                </div>

                <div className="col-12 pb-4">
                    <input
                        name='titre'
                        id='titre'
                        placeholder="Titre de la partie"
                        className="form-control w-100"
                        onChange={(e) => setGameTitle(e.target.value)}
                        value={gameTitle}
                    />
                </div>

                <div className="col-12 pb-4 d-flex justify-content-between">
                    <Button color="primary" style={{ width: '100%' }} onClick={() => addGame()}>Charger la partie</Button>
                </div>

            </div>
        </div>

    );
}

function mapDispatchToProps(dispatch) {
    return {
        addPlayers: function (players) {
            dispatch({ type: 'addPlayers', players })
        },
        addGame: function (game) {
            dispatch({ type: 'addGame', game })
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Home)


