let auth=require("../model/like&Unlike")


async function likeDislike(req,res){
    let data=await auth.likeHouse(req.params.houseId,req.userData).catch((error)=>{
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

async function userLikedHouses(req,res) {
    let data = await auth.userlikedHouse(req.userData).catch((error)=>{
        return{error}
    });
    console.log("data",data);

    if (!data || (data && data.error)) {
        let error = (data && data.error) ? data.error : "Internal Servr error";
        let status = (data && data.status) ? data.status : 500
        return res.status(status).send(error)
    }
    return res.send({data:data.data})
}
module.exports={likeDislike,userLikedHouses};
