const { Schema, model } = require('mongoose');

const Game = new Schema({
    result: {
        type: String,
        required: true,
    },
    bet: {
        type: Number,
        required: true,
    },
    countEnemy: {
        type: Number,
        required: true,
    },
    countPlayer: {
        type: Number,
        required: true,
    },
    raiting: {
        type: Number,
        required: true,
    },
});

module.exports = model('Game', Game);
