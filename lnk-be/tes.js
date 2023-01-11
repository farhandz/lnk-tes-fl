var jwt = require('jsonwebtoken');
const jwtSecret = 'CGoJQhiJoHL0tHF5MFpQgsF0oB0u8ZE5CKk1xm7b5JpSveyHMdcNNLfGhy8YDaNW';



// generate in admin
const generateToken = async () => {

    try {
        const claims = {
            "sub": "9537b20f-611c-490a-914c-cb02adcf085f", //cliend id
            "access" : [ 'shared' , 'pm'] // bisa akses module apa aja
          }
        const token = await  jwt.sign(claims, jwtSecret)
        return token
    } catch (error) {
        return error
    }
}


generateToken().then((dt) => {
    console.log(dt)
})