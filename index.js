const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const MongoStore = require('connect-mongodb-session')(session);
const authRouter = require('./server/routes/auth');
const gameRouter = require('./server/routes/game');
const cardRouter = require('./server/routes/cards');

const app = express();
const MONGODB_URI = 'mongodb+srv://denis:admin@cluster0.wv0yl.mongodb.net/blackjack';

const store = new MongoStore({
    collection: 'sessions',
    uri: MONGODB_URI,
});

app.use(fileUpload({}));
app.use(express.json());
app.use(express.static('static'));
app.use(
    session({
        secret: 'some secret value',
        resave: false,
        saveUninitialized: false,
        store,
    }),
);

app.use('/auth', authRouter);
app.use('/game', gameRouter);
app.use('/cards', cardRouter);

const PORT = 3001;

async function start() {
    await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    });

    app.listen(PORT, () => {
        console.log(`Server is starting in ${PORT} port...`);
    });
}

start();
