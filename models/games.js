const mongoose = require('mongoose');


const GridSchema = mongoose.Schema({
    playerId: String,
    one: Number,
    two: Number,
    three: Number,
    four: Number,
    five: Number,
    six: Number,
    max: Number,
    min: Number,
    suite: Number,
    full: Number,
    square: Number,
    yam: Number
});

const GameSchema = mongoose.Schema({
    turn: Number,
    title: String,
    players: [GridSchema]    
});

module.exports = mongoose.model('games', GameSchema);