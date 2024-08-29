
const { User,Job,App} = require("../models/jobs.model.js");
const bcrypt = require('bcryptjs');
const { access } = require("fs");
const jwt = require('jsonwebtoken');
const path = require('path');
require("dotenv").config();

const validate = require('../middleware/validate.js');

//Home Controller

const index = (req,res)=>{
  
  res.render("index",{});
};

// User Controller

const  createaccount =(req,res)=>{
  res.render('createuser',{});
}


const showUsers = async (req , res ) =>{
          try {

            const users = await User.find({})
            res.status(200).json(users)            
        } catch (error) {
            res.status(500).json({message: error.message})
        }
  };

const createUser =  async (req,res)=>{

    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new User({ name, email, password: hashedPassword });
  
      await user.save();
      res.redirect("/jobs/users");             
    } catch (error) {
        res.status(500).json({message: error.message})
    }

  };

  const updateUser =   async (req,res)=>{

    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id,req.body);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        const updateUser = await User.findById(id);
        res.status(200).json(updateUser); 
                   
    } catch (error) {
        res.status(500).json({message: error.message})
    }
   
};

const singleUser = async (req , res ) =>{
          try {
            //const { id } = req.userId;
            const user = await User.findById(req.userId)
            res.status(200).json(user);            
        } catch (error) {
            res.status(500).json({message: error.message})
        }
      };

const deleteUser = async (req,res)=>{

        try {
            const { id } = req.params;
            const user = await User.findByIdAndDelete(id);
            if (!user) {
              return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({message:"deleted successfully"}); 
                       
        } catch (error) {
            res.status(500).json({message: error.message})
        }
       
    };


//Jobs Controller

    const postajob = (req,res)=>{
  res.render('createjob',{});
}

    const jobs = async (req , res ) =>{
                  try {

                    const jobs = await Job.find({})
                    res.render('jobs', { jobs: jobs });
                } catch (error) {
                    res.status(500).json({message: error.message})
                }
            };

    const createJob = async (req,res)=>{

                  try {
                      
                      const job = await Job.create(req.body)
                      res.redirect("/jobs/jobs");          
                  } catch (error) {
                      res.status(500).json({message: error.message})
                  }
              
                };

    const singleJob =      async (req , res ) =>{
                  try {
                    const { id } = req.params;
                    const user = await Job.findById(id)
                    res.status(200).json(user);            
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
                const { jobId, applicantId, resume } = req.body;
          
                const job = await Job.findById(jobId);
                const applicant = await User.findById(applicantId);

                if (!job || !applicant) {
                  return res.status(404).json({ message: "Job not found" });
                }

              const application = new App({
                jobId,
                applicantId,
                resume
                
              }) 

              await application.save();
              res.status(201).json(application);
              
              }catch (error) {
                res.status(500).json({message: error.message})
            }
            };


//Login Controller

  const login = async (req, res) => {
            try {
              const { email, password } = req.body;

              const user = await User.find( { email: email } );
          
              if (!user) {
                return res.status(401).json({ message: 'Invalid username/email or password' });
              }else{
                const isMatch = await bcrypt.compare(password, user[0].password);
              if (isMatch){
                const token = jwt.sign({
                   email: user[0].email,
                   password:user[0].password
                   }, process.env.JWT_Secret,{
                    expiresIn:'1h'
                   });
                   res.setHeader('access_token',token);
                   res.setHeader('userId',user[0]._id);
                   //Work From here
              }
              
              

              }

            } catch (error) {
              console.error(error);
              res.status(500).json({ message: 'Internal server error' });
            }
          };

  const signin = (req,res)=>{
    res.render('signin',{});
  }



 

 

  module.exports = {
    index,

    showUsers,
    createaccount,
    createUser,
    updateUser,
    singleUser,
    deleteUser,

    jobs,
    postajob,
    createJob,
    singleJob,
    updateJob,
    deleteJob,

    applies,

    login,
    signin

  }