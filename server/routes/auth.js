const { Router } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Uuid = require('uuid');
const mv = require('mv');
const router = Router();

const salt = bcrypt.genSaltSync(10);

router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.json({ message: 'Успешно вышли!' });
    });
});

router.get('/check-auth', async (req, res) => {
    const user = await req.session;
    if (user.isAuthenticated) {
        const userS = await User.findOne({ _id: user.user._id }).populate(
            'games.gameId',
            'countPlayer countEnemy bet result raiting',
        );
        res.json(userS);
    } else {
        res.json(false);
    }
});

router.get('/refresh-user', async (req, res) => {
    const user = await User.findOne({ _id: req.session.user._id }).populate(
        'games.gameId',
        'countPlayer countEnemy bet result raiting',
    );

    res.json(user);
});

router.post('/login', async (req, res) => {
    const { login, password } = await req.body;
    const user = await User.findOne({ login }).populate(
        'games.gameId',
        'countPlayer countEnemy bet result raiting',
    );

    if (user) {
        const hashPassword = bcrypt.compareSync(password, user.password);

        if (hashPassword) {
            req.session.user = user;
            req.session.isAuthenticated = true;
            req.session.save((err) => {
                if (err) throw err;
            });

            res.json({ message: 'Успешно зашли!', user: user });
        } else {
            res.json({ message: 'Неверные данные!', user: false });
        }
    } else {
        res.json({ message: 'Такого пользователя нету!', user: false });
    }
});

router.post('/register', async (req, res) => {
    const { login, password, currentPassword, email } = await req.body;
    const checkLogin = await User.findOne({ login });
    const checkEmail = await User.findOne({ email });

    if (checkLogin) {
        res.json({ message: 'Этот логин уже занят!', user: false });
    } else if (checkEmail) {
        res.json({ message: 'Этот емаил уже занят!', user: false });
    } else if (password !== currentPassword) {
        res.json({ message: 'У вас не одинаковые пароли', user: false });
    } else if (password.length <= 6) {
        res.json({ message: 'Пароль не должен быть меньше 6 символов!', user: false });
    } else if (login.length < 5) {
        res.json({ message: 'Логин не должен быть меньше 5 символов', user: false });
    } else if (password.length >= 6 && login.length >= 5) {
        const hashPassword = bcrypt.hashSync(password, salt);
        const user = new User({ login, password: hashPassword, email });

        user.desks.push({ desk: 'STANDART' });

        await user.save();

        res.json({ message: 'Аккаунт создан!', user: user });
    }
});

router.post('/change-profile', async (req, res) => {
    const { login, email, oldPassword, newPassword } = await req.body;
    const user = await User.findOne({ _id: req.session.user._id });

    if (oldPassword.length === 0 && newPassword.length === 0 && login.length && email.length) {
        user.login = login;
        user.email = email;

        await user.save();

        res.json({ message: 'Успешно сменили данные!' });
    } else if (oldPassword.length > 0) {
        const check = bcrypt.compareSync(oldPassword, user.password);

        if (check) {
            if (newPassword.length >= 6 && login.length !== 0 && email.length !== 0) {
                const hashPassword = bcrypt.hashSync(newPassword, salt);

                user.password = hashPassword;
                user.login = login;
                user.email = email;

                await user.save();

                res.json({ message: 'Успешно сменили данные!' });
            } else if (newPassword.length <= 5) {
                res.json({ message: 'Пароль слишком короткий' });
            }
        } else if (!check) {
            res.json({ message: 'Проверьте данные!' });
            console.log('Проверьте данные!');
        }
    } else {
        res.json({ message: 'Введите корректные данные!' });
    }
});

router.post('/change-avatar', async (req, res) => {
    try {
        const file = await req.files.file;
        const user = await User.findById(req.session.user._id);

        const avatarName = Uuid.v4() + '.jpg';

        file.mv(
            'C:\\Users\\Offic\\OneDrive\\Рабочий стол\\ReactNativeBlackJack\\static\\' + avatarName,
        );

        user.avatar = avatarName;

        await user.save();

        res.json({ message: 'Upload image is completed', user: user }).status(200);
    } catch (e) {
        console.log(e);
        res.json({ message: 'Upload is failed' }).status(400);
    }
});

router.post('/bonus', async (req, res) => {
    const user = await User.findOne({ _id: req.session.user._id });
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    function randomInteger(min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }

    const bonus = randomInteger(1000, 5000);

    if (user.bonusTime === today.toLocaleDateString()) {
        res.json({ message: 'Сегодня вы уже получали бонус!' });
    } else if (user.bonusTime !== today.toLocaleDateString()) {
        user.bonusTime = today.toLocaleDateString();
        user.money = user.money + bonus;

        await user.save();

        res.json({ message: `Ваш бонус ${bonus}`, user: user });
    }
});

router.get('/all-users', async (req, res) => {
    const users = await User.find().select('-password');

    res.json({ message: 'Все пользователи', users: users });
});

router.get('/user/:id', async (req, res) => {
    const user = await User.findOne({ _id: req.params.id })
        .populate('games.gameId', 'countPlayer countEnemy bet result raiting')
        .select('-password');

    res.json({ message: 'User', user: user });
});

module.exports = router;
