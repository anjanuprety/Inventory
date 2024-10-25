const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Import routes
const homeRoute = require('./routes/home');
const inventoryRoute = require('./routes/inventory');
const purchaseRoute = require('./routes/purchase');

// Route setup
app.use('/home', homeRoute);
app.use('/inventory', inventoryRoute);
app.use('/purchase', purchaseRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});