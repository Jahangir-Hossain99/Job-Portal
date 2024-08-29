const express = require("express");
const {showUsers,createaccount, createUser, updateUser,singleUser, deleteUser,
        jobs,postajob, createJob,singleJob,updateJob,deleteJob,
        applies,
        login,signin,
        index
 } = require('../controllers/jobs.controller.js');

 const {validate}  = require('../middleware/validate.js');

 const cookieParser = require('cookie-parser');

 const router = express.Router();

///jobs/home route
router.get("/", index);

//User Routes

router.get('/users', showUsers);
router.get('/createaccount',createaccount);
router.post('/register', createUser);
router.put('/updateuser/:id', updateUser);
router.get('/single/:id', singleUser);
router.delete('/delete/:id', deleteUser);

// Job Route
router.get('/jobs', jobs);
router.get('/postajob',postajob);
router.post('/createjob', createJob);
router.put('/updatejob/:id', updateJob);
router.get('/singlejob/:id', singleJob);
router.delete('/deletejob/:id', deleteJob);

//Application Route

router.post('/applications',applies);

//Login Route

router.post('/login',login);
router.get('/signin',signin);




module.exports = router;

