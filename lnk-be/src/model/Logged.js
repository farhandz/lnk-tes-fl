const mongoose = require('mongoose')
const paginate = require('./plugins/paginate.plugin')

const AuditSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: false,
        ref: "User"
    },
    token: {
     type: String,
     required: false
    },
    log_in_date: {
        type: Date,
        required: false
    },
    log_out_data: {
        type: Date,
        required: false,
        default: null,
        
    },
    
}, { timestamps: true })


AuditSchema.plugin(paginate);

module.exports = mongoose.model('Logged', AuditSchema)