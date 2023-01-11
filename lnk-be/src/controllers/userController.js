require('dotenv').config()
const pick = require('../utils/pick');
const moment = require('moment');
const { setReponseSukses, setResponseError } = require('../utils/response');
const userService = require('../service/userService');
const audit = {
    userLogin: async (req , res) => {
        try {
            const dataBody = req.body;
            const data = await userService.userLogin(dataBody);
            setReponseSukses(req, res, "Suksess Login", data, 200 )
        } catch (error) {
            setResponseError(req, res, error.message, null, error.code)
        }
    },


    
    userRegister : async (req , res) => {
        try {
            const dataBody = req.body;
            const data = await userService.userRegister(dataBody);
            setReponseSukses(req, res, "Suksess Register", data, 200 )
        } catch (error) {
            setResponseError(req, res, error.message, null, error.code)
        }
    },


    userLogout: async(req, res) => {
        try {
            const data = await userService.userLogout();
            setReponseSukses(req, res, "Suksess Register", data, 200 )
        } catch (error) {
            setResponseError(req, res, error.message, null, error.code)
        }
    },
}

module.exports = audit;