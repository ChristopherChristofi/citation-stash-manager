"use strict";

const CiteStash = require('../models/model.js');

// Create the citaition data method
exports.create = (req, res) => {
  // Initiate validation of request
  if (!req.body.title) {
    return res.status(400).send({
      message: "Citation title must be provided."
    });
  } else if (!req.body.author) {
    return res.status(400).send({
      message: "Citation author must be provided."
    });
  } else if (!req.body.link) {
    return res.status(400).send({
      message: "Citation link must be provided"
    });
  }

  // Create citation object
  const citation = new CiteStash({
    title: req.body.title,
    author: req.body.author,
    link: req.body.link,
    description: req.body.description || "Empty description",
    notes: req.body.notes || "Empty notes"
  });

  citation.save()
  .then(data => {
    res.send(data);
    console.log("Citation created.");
  }).catch(err => {
    res.status(500).send({
      message: err.message
    });
  });
};