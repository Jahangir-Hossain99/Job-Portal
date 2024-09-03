const express = require('express');
const mongoose = require('mongoose');
const JobRoute = require('./routes/jobportal.route');
const app = express();

app.set("view engine","ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/jobs", JobRoute);

const  errorHandler = (err, req,res,next)=>{

  if(res.hasdersSent){
    return next(err);
  }
  res.status(500).json({error: err});

}

app.use(errorHandler);





  

  mongoose.connect("mongodb+srv://JOBS:JOBS@jobs.ftrll5b.mongodb.net/Jobs?retryWrites=true&w=majority&appName=Jobs")
  .then(()=>{
    
    console.log("Connect to Database")
    app.listen(3000, () => {
        console.log(`Example app listening on port`)
      })
  })
  .catch(()=>{
    console.log("Connection Log Failed")
  })

  