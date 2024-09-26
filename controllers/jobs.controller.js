
const { User,Job,App} = require("../models/jobs.model.js");
const bcrypt = require('bcryptjs');
const { access } = require("fs");
const jwt = require('jsonwebtoken');
const path = require('path');
require("dotenv").config();

const validate = require('../middleware/validate.js');

//Home Controller

const index =async (req,res)=>{
  const jobs = await Job.find({})
  res.render("index",{jobs,req});
};



//Jobs Controller

    const postajob = (req,res)=>{
  res.render('createjob',{req});
}

    const jobs = async (req , res ) =>{
                  try {

                    const jobs = await Job.find({})
                    res.render('jobs', { jobs: jobs,req });
                } catch (error) {
                    res.status(500).json({message: error.message})
                }
            };

    const createJob = async (req,res)=>{

                  try {
                      
                      const job = await Job.create(req.body)
                      res.render('createjob',{req});        
                  } catch (error) {
                      res.status(500).json({message: error.message})
                  }
              
                };

    const singleJob =      async (req , res ) =>{
                  try {
                    const { id } = req.params;
                    const job = await Job.findById(id)
                    const appliedJobs = null;
                    res.render('jobdetails',{job:job, appliedJobs,req});              
                } catch (error) {
                    res.status(500).json({message: error.message})
                }
              };       
        const updateJob =async (req,res)=>{

          try {
              const { id } = req.params;
              const user = await Job.findByIdAndUpdate(id,req.body);
              if (!user) {
                return res.status(404).json({ message: "User not found" });
              }
              const updateUser = await User.findById(id);
              res.status(200).json(updateUser); 
                        
          } catch (error) {
              res.status(500).json({message: error.message})
          }
        
      };

    const deleteJob = async (req,res)=>{

      try {
          const { id } = req.params;
          const user = await Job.findByIdAndDelete(id);
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
          res.status(200).json({message:"deleted successfully"}); 
                     
      } catch (error) {
          res.status(500).json({message: error.message})
      }
     
  };


//Application Controller

  const applies = async (req, res) => {
              try {
                
                const applicantId = req.body.userId;
                const jobId= req.params.id;
          
                const appliedJob = await App.findOne({ applicantId, jobId });
                if (appliedJob) {
                  return res.status(400).json({ message: 'You have already applied for this job.' });
                }

                const newAppliedJob = new App({ applicantId, jobId });
                await newAppliedJob.save();

                const jobs = await Job.find({})
                    res.render('jobs', { jobs: jobs,req });
            
              }catch (error) {
                res.status(500).json({message: error.message})
            }
            };

      const appliedJobs= async (req, res)=>{
        try {
          const applicantId = req.body.userId;
          if (!applicantId || !User.findById(applicantId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
          }
          const appliedJobs = await App.find({ applicantId }).populate('jobId');
          
          console.log(appliedJobs);
          res.render('appliedjobs',{ appliedJobs:appliedJobs,req}); 
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal server error' });
        }
      }      


//Login Controller

const login = async (req, res) => {
  try {
    // Destructure email and password from request body
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid  credentials' }); 
    }
    // Validate password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({  
 email: user.email, id: user._id }, process.env.JWT_SECRET,  
 {
      expiresIn: '1h', // Adjust expiration time based on requirements
    });

    // Set cookie with secure and HTTP-only flags
    res.cookie('Authorization', token, {
      maxAge: 3000000, // 50 minutes (adjust as needed)
      httpOnly: true,
      secure: true,
      sameSite: 'none', // May require additional server configuration for cross-site requests
    });
    req.flash('message','Log In Completed');
    res.redirect('/jobs/single');
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}



const logout = async(req,res)=>{
  try {
    res.clearCookie('Authorization');
    res.redirect("/jobs/");  
    
  } catch (error) {
    return error;
  }
}

  const signin = (req,res)=>{
    res.render('signin',{req});
  }



 

 

  module.exports = {
    index,

    

    jobs,
    postajob,
    createJob,
    singleJob,
    updateJob,
    deleteJob,

    applies,
    appliedJobs,

    login,
    signin,
    logout

  }