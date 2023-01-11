const router = require('express').Router()
const userController = require('../controllers/userController')
const verifyToken = require('../middleware/auth')


router.post('/login',  userController.userLogin);
router.post('/register',  userController.userRegister);
router.post('/logout',  verifyToken, userController.userLogout);


module.exports = router