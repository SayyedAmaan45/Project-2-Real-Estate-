let auth = require("../model/auth");

async function register(req, res) {
    let data = await auth.register(req.body).catch((error) => {
        return { error }
    })
    console.log("Data",data);
    if (!data || (data && data.error)) {
        let error = (data && data.error) ? data.error : "Internal Server Error"
        let status = (data && data.status) ? data.status : 500;
        return res.status(status).send({ error })
    }
    return res.send({ data: data.data })
}

async function login(req,res){
    let data=await auth.login(req.body).catch((error)=>{
        return {error}
    })
    console.log("data",data);
    if(!data || (data && data.error)){
        let error= (data && data.error) ? data.error:"Internal Server Error"
        let status= (data && data.status) ? data.status:500;
        return res.status(status).send({error})
    }
    return res.header("token",data.token).send({status:"USER LOGIN SUCCESSFULLY...!!!"})

}
async function logout(req,res){
    let data=await auth.logout(req.userData).catch((error)=>{
        return {error}
    })
        if(!data || (data && data.error)){
        let error= (data && data.error) ? data.error:"Internal Server Error"
        let status= (data && data.status) ? data.status:500;
        return res.status(status).send({error})
    }
    return res.send({status:"User Logout Successfully"})

} 

module.exports={register, login,logout}
