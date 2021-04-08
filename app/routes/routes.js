"use strict";

module.exports = (app) => {

  // Controller requirement statement
  const citations = require('../controllers/controller.js');

  // Add citation
  app.post('/citations', citations.create);

}