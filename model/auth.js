let { User } = require("../schema/user")
let joi = require("joi")
let {validate}=require("../helper/validation")
let security = require("../helper/security")


// SignUp for User 
// input : User Name, User Email & password
// Output: User SignUp Success
// What to Do : we have to Register new User 
async function register(params) {
    // UserData Validation
    let schema=joi.object({
        userName: joi.string().min(2).max(155).required(),
        email: joi.string().email().max(255).required(),
        password: joi.string().min(8).max(16).required(),
    })
    let check=await validate(schema,params).catch((error)=>{
        return {error}
    })
    if(!check || (check && check.error)){
        return {error:check.error,status:400}
    }
    // Check If User already Exist 
    let user=await User.findOne({where:{emailID:params.email}}).catch((error)=>{
        return {error}
    })
    if(user){
        return {error:"User Already Existed",status:409}
    }
    // Data Formating
    let data={
        name:params.userName,
        emailID:params.email,
        password: params.password
    }
    // Insert data
    let insert=await User.create(data).catch((error)=>{
        return {error}
    })
    if(!insert || (insert && insert.error)){
        return {error:"Interal Server Error",status:500}
    }

    let response={
        id:insert.id,
        userName:insert.name,
        email:insert.emailID,
    }
    // return Respone
    return {data:response}
}

// login for User 
// input :User Email & password
// Output: Login Successfull
// What to Do : we have to login User
async function login(params){
    // UserData Validation
    let schema = joi.object({
        userEmail: joi.string().email().required(),
        password: joi.string().min(8).max(16).required()
    })
    let check = await validate(schema, params).catch((error) => {
        return { error }
    })
    console.log("check", check);
    if (!check || (check && check.error)) {
        return { error: check.error, status: 404 }
    }
    // check if user email exist in db
    let user = await User.findOne({ where: { emailID: params.userEmail } }).catch((error) => {
        return { error }
    })
    console.log("user", user);

    if (!user || (user && user.error)) {
        return { error: "User Not Found", status: 404 }
    }
    // Compare Password
    if (user.password !== params.password) {
        return { error: "Incorrect Password", status: 401 }
    }
    // generate token
    let token = await security.signAsync({ id: user.id }).catch((error) => { return { error } });
    if (!token || (token && token.error)) {
        return { error: "Internal Server Error", status: 500 }
    }
    console.log("token", token);

    // save token in db
    let update = await User.update({ token }, { where: { id: user.id } }).catch((error) => { return { error } });
    if (!update || (update && update.error)) {
        return { error: "User Not Login Yet...! Please Try Again", status: 500 }
    }
    console.log("update", update);

    // Return Response
    return { token }
}

// logout for User 
// input : User Token
// Output: LogOut Successful
// What to Do : we have to logout User
async function logout(userData) {
    // User Data Validation
    let schema = joi.object({
        id: joi.number().required()
    })

    let check = await validate(schema, { id: userData.id }).catch((error) => {
        return { error }
    })
    if (!check || (check && check.error)) {
        return { error: check.error, status: 400 }
    }
    // Update token as empty in DB
    let update = await User.update({ token: "" }, { where: { id: userData.id } }).catch((error) => {
        return { error }
    })
    if (!update || (update && update.error)) {
        return { error: "Not Logout", status: 500 }
    }
    // Return Response
    return { data: "Success" }
}



module.exports={register,login,logout}