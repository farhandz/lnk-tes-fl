// const Audit = require("../model/Audit");

const Logged = require("../model/Logged");
const User = require("../model/User");
const { generateToken, compare, hash } = require("../utils/user");

async function userLogin(dataBody) {
    try {
        console.log(dataBody);
        const user = await User.findOne({email: dataBody.email})
        console.log(user);
        if(!user) {
            throw new Error("user not found")
        }
        
    


        let token;
        if(compare(dataBody.password , user.password)) {
            token = await generateToken(user)
        } else {
            const error  = new Error("Username / password salah")
            error.code = 401;
            throw error
        }


        // send logged user 
        await Logged.create({
            user_id: user.id,
            token: token,
            log_in_date: new Date()
        })

        return token
    } catch (err) {
        const error  = new Error(err.errors ? JSON.stringify(err.errors) : err.message)
        error.code = err.code ? err.code : 500;
        throw error
    }
}


async function userRegister(dataBody) {
    try {
        console.log(dataBody.email);
        const user = await User.findOne({email: dataBody.email})
        console.log(user);
        if(user) {
            throw new Error("user has been registered")
        }
        dataBody.password = hash(dataBody.password)
        const data = User.create(dataBody);
        return data;
    } catch (err) {
        const error  = new Error(err.errors ? JSON.stringify(err.errors) : err.message)
        error.code = err.code ? err.code : 500;
        throw error
    }
}




async function userLogout(token) {
    try {
        const data = await Logged.findOneAndUpdate({token: token}, {log_out_data: Date()})
        return data;
    } catch (err) {
        const error  = new Error(err.errors ? JSON.stringify(err.errors) : err.message)
        error.code = err.code ? err.code : 500;
        throw error
    }
}






module.exports = {userLogin, userRegister, userLogout}
