const { Router } = require('express');
const User = require('../models/User');
const Game = require('../models/Game');
const router = Router();

router.post('/save-game', async (req, res) => {
    const { result, bet, countEnemy, countPlayer, raiting } = await req.body;
    const user = await User.findOne({ _id: req.session.user._id });

    if (!result) {
        res.json({ message: 'Ошибка' });
    } else {
        if (result === 'lose') {
            if (user.raiting === 0 || user.raiting - raiting === 0) {
                user.raiting = 0;
                user.money = user.money - +bet;
            } else if (user.raiting - raiting < 0) {
                user.raiting -= user.raiting;
                user.money = user.money - +bet;
            } else if (user.raiting - raiting >= 0) {
                user.money = user.money - +bet;
                user.raiting = user.raiting - +raiting;
            }
        } else if (result === 'win') {
            user.money = user.money + +bet;
            user.raiting = user.raiting + +raiting;
        }
    }

    const game = new Game({
        bet,
        result,
        countEnemy,
        countPlayer,
        raiting,
    });

    await game.save();

    user.games.push({
        gameId: game,
    });

    await user.save();

    res.json({ message: 'Успешно!', game: game, user: user });
});

module.exports = router;
