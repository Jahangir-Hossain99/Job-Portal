const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const JobRoute = require('./routes/jobportal.route');
const UserRoute = require('./routes/user.route');
const app = express();
const flash = require('connect-flash');
const session = require('express-session');

app.set("view engine","ejs");

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false  }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
 secret:'secret',
 cookie:{maxAge:3000},
 resave:false,
 saveUninitialized:false
}));
app.use(flash());

app.use("/jobs", JobRoute);
app.use("/jobs", UserRoute);

const  errorHandler = (err, req,res,next)=>{

  if(res.hasdersSent){
    return next(err);
  }
  res.status(500).json({error: err});

}








  

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

  