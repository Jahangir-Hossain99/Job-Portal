const express = require("express");
const { jobs,postajob, createJob,singleJob,updateJob,deleteJob,
        applies,appliedJobs,
        login,signin,logout,
        index
 } = require('../controllers/jobs.controller.js');

 const { authenticateToken,islogout } = require('../middleware/validate');

 const cookieParser = require('cookie-parser');

 const router = express.Router();

///jobs/home route
router.get("/", index);


//User Routes

// router.get('/users', showUsers);

// router.get('/createaccount',islogout,createaccount);
// router.post('/register', createUser);
// router.post('/updateuser/', authenticateToken,updateUser);
// router.get('/update/',authenticateToken, updateView);
// router.get('/single/',authenticateToken, singleUser);
// router.delete('/delete/:id',authenticateToken, deleteUser);

// Job Route
router.get('/jobs', jobs);
router.get('/postajob',authenticateToken,postajob);
router.post('/createjob', createJob);
// router.put('/updatejob/:id', updateJob);
router.get('/singlejob/:id', singleJob);
// router.delete('/deletejob/:id', deleteJob);

//Application Route

router.post('/applications/:id',authenticateToken,applies);
router.get('/appliedJobs',authenticateToken,appliedJobs);

//Login Route

// router.post('/login',login);
router.post('/login',login);
router.get('/logout',logout);
router.get('/signin',signin);




module.exports = router;

