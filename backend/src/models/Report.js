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
        default:"Unknown"
    },

    extractedText:{
        type:String,
        default:""
    },

    extractedData:{
        type:Object,
        default:{}
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

    analysis: [
        {
            parameter: String,
            organ: String,
            severity: String,
            confidence: Number,
            condition: String
        }
    ]

},{
    timestamps:true
});

module.exports = mongoose.model("Report",reportSchema);