const express = require("express");
const {showUsers,createaccount, createUser, updateUser,updateView,singleUser, deleteUser,index} = require('../controllers/user.controller');

 const { authenticateToken,islogout } = require('../middleware/validate');

 const cookieParser = require('cookie-parser');

 const router = express.Router();

 

 router.get('/users', showUsers);

router.get('/createaccount',islogout,createaccount);
router.post('/register', createUser);
router.post('/updateuser/', authenticateToken,updateUser);
router.get('/update/',authenticateToken, updateView);
router.get('/single/',authenticateToken, singleUser);
router.delete('/delete/:id',authenticateToken, deleteUser);

module.exports = router;