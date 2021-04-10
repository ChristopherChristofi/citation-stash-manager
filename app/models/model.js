"use strict";

const mongoose = require('mongoose');

const CiteStashSchema = mongoose.Schema({
  title: String,
  author: String,
  link: String,
  project: String,
  notes: String
}, {
  // Track when created and updated
  timestamps: true
});

module.exports = mongoose.model('CiteStash', CiteStashSchema);