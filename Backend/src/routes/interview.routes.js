const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const interviewcontroller = require('../controllers/interview.controller');
const upload = require('../middleware/file.middleware');

const interviewRouter = express.Router();

/**
 * @routes POST /api/interview
 * @description Generate an interview report based on the candidate's resume, self-description, and job description.
 * @access private
 */

interviewRouter.post("/",authMiddleware.authUser,upload.single('resume'),interviewcontroller.generateReport)

module.exports = interviewRouter;