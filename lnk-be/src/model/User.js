const mongoose = require('mongoose')
const paginate = require('./plugins/paginate.plugin')

const AuditSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false
    },
}, { timestamps: true })


AuditSchema.plugin(paginate);

module.exports = mongoose.model('User', AuditSchema)