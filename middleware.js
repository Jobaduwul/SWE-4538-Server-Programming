const express = require('express');

const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.query.apiKey;

  if (!apiKey || apiKey !== 'your_api_key_here') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
};

const logRequestMiddleware = (req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
  };

module.exports = {
    apiKeyMiddleware,
    logRequestMiddleware,
};