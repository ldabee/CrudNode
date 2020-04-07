const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const PORT = process.env.PORT || 3090;
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose(); //! VERBOSE

const app = express();

//SQL LITE CONNECTION
var connection = new sqlite3.Database('test.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the db Test.');
});

app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

require('./routes/app-route')(app, connection);

// connection.connect(function (err) {
//     (err) ? console.log(err) : console.log(`Connection to the DB is OK`);
// });

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});