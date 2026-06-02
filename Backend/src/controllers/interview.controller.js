const pdfParse = require('pdf-parse');
const {generateInterviewreport} = require('../services/ai.services')
const InterviewReportModel = require('../models/interviewreport.model')

async function generateReport(req,res){
    const resumeFile = req.file;

    const resumeData = await (new pdfParse.PDFParse(resumeFile.buffer)).getText();
    const {selfdescription, jobdescription} = req.body;

    const interviewReportbyAi = await generateInterviewreport({
        resume: resumeData.text,
        selfdescription,
        jobdescription
    })

    const interviewReport = await interviewReportModel.create({
        user:req.user._id,
        resume: resumeData.text,
        selfdescription,
        jobdescription,
        ...interviewReportbyAi
    })

    res.status(200).json({
        success:true,
        data:interviewReport
    })


}
module.exports = {
    generateReport
}