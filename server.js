const express = require("express");
const app = express();
const db = require('./database/db.js')
const fs = require('fs');

const port = process.env.PORT || 3001;

const usersController = require('./controller/users.js')
const jobsController = require('./controller/Jobs.js');
const emailController = require('./controller/Email.js');

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

app.use('/users', usersController)
app.use('/jobs', jobsController);
app.use('/email', emailController);

app.get("*", (req, res) => {
    res.setHeader("content-type", "text/html");
    fs.createReadStream(`${__dirname}/client/build/index.html`).pipe(res);
});

app.listen(port, () => console.log(`Listening at localhost:${port}`));

