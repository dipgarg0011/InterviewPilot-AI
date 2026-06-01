const mongoose = require('mongoose');

/**
 * -job desc schems:string
 * -interview question schema:[{}]
 * -resume:string
 * -self evaluation:string
 * 
 * 
 * techincal skills:[]
 * behavioral skills:[]
 * skill gap:[]
 * future plan:[{}]
 * 
 */

const technicalQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:[true,'Please provide a question']
    },
    answer:{
        type:String,
        required:[true,'Please provide an answer']
    }
},{
    _id:false
});

const behavioralQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:[true,'Please provide a question']
    },
    answer:{
        type:String,
        required:[true,'Please provide an answer']
    }
},{
    _id:false
});

const skillGapSchema = new mongoose.Schema({
    skill:{
        type:String,
        required:[true,'Please provide a skill']
    },
    gapDescription:{
        type:String,
        required:[true,'Please provide a gap description']
    }
});

const futurePlanSchema = new mongoose.Schema({
    day:{
        type:Number,
        required:[true,'Please provide a day']
    },
    planDescription:{
        type:String,
        required:[true,'Please provide a plan description']
    },
    focusArea:{
        type:String,
        required:[true,'Please provide a focus area']
    },
    tasks:{
        type:[String],
        required:[true,'Please provide tasks']
    }
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription:{
        type:String,
        required:[true,'Please provide job description']
    },
    resume:{
        type:String
    },
    selfEvaluation:{
        type:String
    },
    score:{
        type:Number,
        default:0,
        max:100,
        min:0
    },
    technicalQuestions:[technicalQuestionSchema],
    behavioralQuestions:[behavioralQuestionSchema],
    skillGaps:[skillGapSchema],
    futurePlans:[futurePlanSchema]
},{
    timestamps:true
})

const InterviewReport = mongoose.model('InterviewReport',interviewReportSchema);
module.exports = InterviewReport;