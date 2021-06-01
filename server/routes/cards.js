const { Router } = require('express');
const User = require('../models/User');
const router = Router();

router.post('/buy-card', async (req, res) => {
    const { name, price } = await req.body;
    const user = await User.findOne({ _id: req.session.user._id });

    const arrDesks = [];
    user.desks.forEach((d) => arrDesks.push(d.desk));

    const check = arrDesks.filter((d) => name === d);
    if (+price > user.money) {
        res.json({ message: 'У вас не хватает денег купить набор!' });
    } else if (+price <= user.money) {
        if (check.length > 0) {
            res.json({ message: 'Этот набор уже куплен' });
        } else if (check.length === 0) {
            user.money = user.money - +price;
            user.desks.push({
                desk: name,
            });

            await user.save();

            res.json({ message: 'Набор куплен' });
        }
    }
});

router.get('/purchased', async (req, res) => {
    const user = await User.findOne({ _id: req.session.user._id });
    const cards = [];
    user.desks.forEach((d) => cards.push(d.desk));

    res.json({ message: 'Все колоды карт', cards: cards });
});

router.post('/select-card', async (req, res) => {
    const { title } = await req.body;

    await User.findByIdAndUpdate(
        { _id: req.session.user._id },
        {
            selectDesk: title,
        },
    );

    res.json({ message: `Выбрана колода ${title}`, title: title });
});

module.exports = router;
