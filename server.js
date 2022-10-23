const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const db = require('./database/db.js')

const port = process.env.PORT || 3001;

const pg = require('pg');
const bcrypt = require('bcrypt');
const usersController = require('./controller/users.js')

const jobsController = require('./controller/Jobs.js');

const { expressSession, pgSession } = require('./session.js');
app.use(
    expressSession({
        store: new pgSession({
            pool: db,
            createTableIfMissing: true,
        }),
        secret: process.env.EXPRESS_SESSION_SECRET_KEY,
        resave: false,
        saveUninitialized: false
    })
);



app.use(express.json());
app.use(express.static("./client/build"));

app.use(`/users`, usersController)
app.use('/jobs', jobsController);

app.listen(port, () => console.log(`Listening at localhost:${port}`));