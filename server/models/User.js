const { Schema, model } = require('mongoose');

const User = new Schema({
    login: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default:
            'https://media.istockphoto.com/vectors/profile-picture-vector-illustration-vector-id587805156?k=6&m=587805156&s=612x612&w=0&h=Fqz5lYgwiZc0LUUmYZajX-wmFoSwIMBtWoXJNLkJ9Ek=',
    },
    raiting: {
        type: Number,
        default: 0,
    },
    money: {
        type: Number,
        default: 2000,
    },
    games: [
        {
            gameId: {
                type: Schema.Types.ObjectId,
                ref: 'Game',
            },
        },
    ],
    desks: [
        {
            desk: {
                type: String,
                default: 'STANDARD',
            },
        },
    ],
    bonusTime: {
        type: String,
    },
    selectDesk: {
        type: String,
        default: 'STANDARD',
    },
});

module.exports = model('User', User);
