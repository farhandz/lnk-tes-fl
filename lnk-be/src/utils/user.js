const bcrypt = require('bcrypt');
const { text } = require('body-parser');
const jwt = require('jsonwebtoken')
const saltRounds = 10;
module.exports = {
    hash(password) {
        const salt = bcrypt.genSaltSync(saltRounds);
        return  bcrypt.hashSync(password, salt);
    },
    compare(text_password, hash_password) {
        return bcrypt.compareSync(text_password, hash_password);
    },

    async generateToken(user) {
     return await jwt.sign({
            id: user.id,
          }, process.env.JWT_SECRET);
    },
    
    

}