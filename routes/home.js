const express = require('express');
const router = express.Router();
const fs = require('fs');

// Fetch and serve inventory status
router.get('/', (req, res) => {
  fs.readFile('./data/inventory.json', (err, data) => {
    if (err) throw err;
    const inventory = JSON.parse(data);
    res.sendFile(__dirname + '/public/home.html');
  });
});

module.exports = router;