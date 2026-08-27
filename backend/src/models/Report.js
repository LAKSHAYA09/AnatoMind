const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    fileName:{
        type:String,
        required:true
    },

    filePath:{
        type:String,
        required:true
    },

    reportType:{
        type:String,
        default:"Blood Test"
    },

    extractedText:{
        type:String,
        default:""
    },

    extractedData:{
        type:Object,
        default:{}
    },

    analysis: [
        {
            parameter: String,
            value: Number,
            organ: String,
            condition: String,
            severity: String,
            confidence: Number,
            explanation: String,
            source: String,
        }
    ],

    organSummary: {
        type: Object,
        default: {}
    },

    status:{
        type:String,
        enum:[
            "Uploaded",
            "Processing",
            "Completed",
            "Failed"
        ],
        default:"Uploaded"
    },

},{
    timestamps:true
});

module.exports = mongoose.model("Report",reportSchema);