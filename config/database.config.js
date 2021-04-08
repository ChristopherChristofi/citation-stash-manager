"use strict";

require("dotenv").config();

// TODO prompt user input
const username = encodeURIComponent(process.env.USER);
const password = encodeURIComponent(process.env.PASS);
// Set host port location
const clusterUrl = encodeURIComponent(process.env.CLUSTER || "localhost:27017");
// Set authentication source
const auth = encodeURIComponent(process.env.AUTHSOURCE);
// Set path, for example database name
const dpath = encodeURIComponent(process.env.DPATH);
// Set authentication mechanism
const mech = encodeURIComponent(process.env.MECH || "SCRAM-SHA-256");

const uri = `mongodb://${username}:${password}@${clusterUrl}/${dpath}?authSource=${auth}&authMechanism=${mech}&poolSize=20&writeConcern=majority`

module.exports = { uri }