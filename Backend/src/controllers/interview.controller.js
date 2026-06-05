const pdfParse = require('pdf-parse-fork');
const { generateInterviewreport } = require('../services/ai.services');
const InterviewReportModel = require('../models/interviewreport.model');

async function generateReport(req, res) {
    try {
        const resumeFile = req.file;

        if (!resumeFile) {
            return res.status(400).json({ success: false, message: "Resume file is required" });
        }

        if (!req.user || !req.user._id) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const resumeData = await pdfParse(resumeFile.buffer);
        const { selfdescription, jobdescription } = req.body;

        const interviewReportbyAi = await generateInterviewreport({
            resume: resumeData.text,
            selfdescription,
            jobdescription
        });

        const interviewReport = await InterviewReportModel.create({
            user: req.user._id,
            resume: resumeData.text,
            selfdescription,
            jobdescription,
            ...interviewReportbyAi
        });

        res.status(200).json({
            success: true,
            interviewReport
        });

    } catch (error) {
        console.error("generateReport error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = { generateReport };