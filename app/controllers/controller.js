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
    project: req.body.project || "No Project",
    description: req.body.description || "Empty description",
    notes: req.body.notes || "Empty notes"
  });

  // Save data insert
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

// Retrieve all citations
exports.findAll = (req, res) => {
  CiteStash.find()
    .then(citations => {
      res.send(citations);
      console.log("All citations retrieved.")
    }).catch(err => {
      res.status(500).send({
        message: err.message
    });
  });
};

exports.findOne = (req, res) => {
  CiteStash.findById(req.params.id)
    .then(citation => {
      if(!citation) {
        return res.status(404).send({
          message: "Citation with not found, id: " + req.params.id
        });
      }
      res.send(citation);
    }).catch(err => {
      if(err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Citation with not found, id: " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Error retrieving citation with id: " + req.params.id
    });
  });
};