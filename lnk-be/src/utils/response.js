module.exports = {
    setReponseSukses(req, res, message , data,  status = 200,) {
        return res.status(status).json({
            message: message,
            data,
        })
    },

    setResponseError(req, res, message, data = null , status) {
        return res.status(status).json({
            message: message,
            data: data,
        })
    }

    
}