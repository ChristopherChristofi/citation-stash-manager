"use strict";

module.exports = (app) => {

  // Controller requirement statement
  const citations = require('../controllers/controller.js');

  // Add citation
  app.post('/citations', citations.create);

  // Delete a selected citation by id
  app.delete('/citations/:id', citations.delete);

  // Retrieve all citations selection
  app.get('/citations', citations.findAll);

  // Retrieve selected citation by unique id
  app.get('/citations/:id', citations.findOne);
}