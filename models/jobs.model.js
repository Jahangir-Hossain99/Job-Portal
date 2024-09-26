const mongoose = require("mongoose");



const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});

const JobSchema = mongoose.Schema({

    title: {
        type: String,
        required: [true, "Plase enter a title for job"]
    },
    companyName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required:false,
    },
    description: {
        type: String,
        required:true,
    },
    salary: {
        type: Number,
        required:false,
    },
    

})

const AppSchema = mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
    },
    
    applicantId: { type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
    },
    resume: {
        type:String,
        required: false
    },
 
});

const User = mongoose.model("User", UserSchema);
const Job = mongoose.model("Job", JobSchema);
const App = mongoose.model("App", AppSchema);
module.exports = {User,Job,App};