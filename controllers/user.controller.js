const { User,Job,App} = require("../models/jobs.model.js");
const bcrypt = require('bcryptjs');
const { access } = require("fs");
const jwt = require('jsonwebtoken');
const path = require('path');
require("dotenv").config();

const validate = require('../middleware/validate.js');


const  createaccount =(req,res)=>{
    res.render('createuser',{req});
  }
  
  
  const showUsers = async (req , res ) =>{
            try {
  
              const users = await User.find({})
              res.status(200).json(users)            
          } catch (error) {
              res.status(500).json({message: error.message + "error"})
          }
    };
  
  const createUser =  async (req,res)=>{
  
      try {
        const { name, email, password } = req.body;
        const exists = await User.findOne({email:email});
        if (exists) {
          res.status(400).send("User exists");
          return null;
        }else{
          const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = new User({ name, email, password: hashedPassword });
    
        await user.save();
        res.redirect("/jobs/jobs");   
        return null;
        }
                  
      } catch (error) {
          res.status(500).json({message: error.message})
      }
  
    };
  
    const updateView = async(req,res)=>{
      try {
        const user = await User.findById(req.body.userId);
               res.render('updateView', { user: user,req }); 
        
      } catch (error) {
        return error;
      }
      
    }
  
    const updateUser = async (req, res) => {
      try {
          const userId = req.body.userId; 
          const updatedData = req.body;
  
          const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
  
          if (!updatedUser) {
              return res.status(404).json({ message: "User not found" });
          }
          req.flash('message','User Information Updated');
          res.render('singleview', {user: updatedUser,req,message:req.flash('message') });
      } catch (error) {
          res.status(500).json({ message: error.message  
   });
      }
  };
  
  const singleUser = async (req , res ) =>{
            try {
              
               const user = await User.findById(req.body.userId);
               
                      res.render('singleview', { user: user,req , message: req.flash('message')});            
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
              res.clearCookie('Authorization');
              res.render('createuser', { req , message: req.flash('message')}); 
                         
          } catch (error) {
              res.status(500).json({message: error.message})
          }
         
      };

      module.exports = {
        showUsers,
    createaccount,
    createUser,
    updateUser,
    updateView,
    singleUser,
    deleteUser,
      };
  