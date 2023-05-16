const express = require('express');
const router = express.Router();
const singleSubmissionController = require('../controllers/singleSubmissionController');

router.post('/', singleSubmissionController.handleSubmissions);

module.exports = router;