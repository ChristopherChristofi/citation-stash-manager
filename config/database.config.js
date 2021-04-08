"use strict";

require("dotenv").config();

// TODO prompt user input
const username = encodeURIComponent(process.env.USER);
const password = encodeURIComponent(process.env.PASS);
// Set host port location
const clusterUrl = encodeURIComponent(process.env.CLUSTER || "localhost:27017");
// Set source
const auth = encodeURIComponent(process.env.AUTHSOURCE);
// Set path
const dpath = encodeURIComponent(process.env.DPATH);

const uri = `mongodb://${username}:${password}@${clusterUrl}/${dpath}?authSource=${auth}&writeConcern=majority`

module.exports = { uri }