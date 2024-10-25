const express = require('express');
const router = express.Router();
const fs = require('fs');
const nodemailer = require('nodemailer');

// Endpoint to display inventory list and request items
router.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/inventory.html');
});

// Endpoint to handle new item requests
router.post('/request-item', (req, res) => {
  const { itemName, requesterEmail, approverEmail } = req.body;

  // Save the request data in a JSON file or in-memory structure
  const newRequest = { itemName, requesterEmail, approverEmail, approved: false };
  fs.readFile('./data/requests.json', (err, data) => {
    const requests = JSON.parse(data || '[]');
    requests.push(newRequest);
    fs.writeFileSync('./data/requests.json', JSON.stringify(requests));
  });

  // Send approval email to the approver
  const transporter = nodemailer.createTransport({ /* Email config */ });
  const mailOptions = {
    from: 'no-reply@inventory.com',
    to: approverEmail,
    subject: 'New Item Request Approval',
    text: `Please approve the request for item: ${itemName}. Click here to approve.`
  };
  transporter.sendMail(mailOptions);

  res.json({ message: 'Request submitted and approval email sent' });
});

module.exports = router;