const express = require('express');
const router = express.Router()
const authRoutes = require('./user.route')
const verifyToken = require('../middleware/auth')
// injecting the service
router.use('/user',  authRoutes)

module.exports = router