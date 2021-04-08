"use strict";

const express = require('express');
const path = require('path');

require("dotenv").config();

const app = express();

app.use(express.static("static"));
app.use(express.json())
app.use(express.urlencoded({
extended: true
}));

let host = process.env.HOST || "localhost";
let port = process.env.PORT || 3000;

const mongoose = require('mongoose');

async function run () {

  try {

    const databaseConfig = await require('../config/database.config.js');

    mongoose.connect(databaseConfig.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(() => {
      console.log("Database connected.");
    }).catch(err => {
      console.log('Database connect failed.', err);
      process.exit();
    });

    app.get('/', (req, res) => {
      res.sendFile('index.html', { root: path.join(__dirname, '../public/')});
    });

    app.listen(port, host, () => {
      console.log(`Server listening on ${host}:${port}`);
    });

  } catch(err) {
    return console.error(err.message);
  }
}

run().catch(console.dir);