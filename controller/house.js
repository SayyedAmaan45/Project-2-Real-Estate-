let house=require("../model/house")

async function createHouse(req, res) {
    let data = await house.createHouse(req.body,req.userData).catch((error) => {
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

async function list(req,res){
    let data=await house.houseList().catch((error)=>{
        return {error}
    })
    console.log("data",data);
    if(!data || (data && data.error)){
        let error=(data && data.error) ? data.error : "Internal Server Error"
        let status=(data && data.status) ? data.status :500;
        return res.status(status).send({error})
    }
    return res.send({data : data.data})
}
async function detail(req,res){
    let data=await house.houseDetail(req.params.houseId).catch((error)=>{
        return {error}
    })
    console.log("data",data);
    if(!data || (data && data.error)){
        let error=(data && data.error) ? data.error : "Internal Server Error"
        let status=(data && data.status) ? data.status :500;
        return res.status(status).send({error})
    }
    return res.send({data : data.data})
}
module.exports={createHouse,list,detail}