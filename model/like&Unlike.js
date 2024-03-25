let { LikeDislike } = require("../schema/likeUnlike");
let { House } = require("../schema/house")
let { User } = require("../schema/user")
let joi = require("joi")
let { validate } = require("../helper/validation")
let security = require("../helper/security");
let { QueryTypes, sequelizeCon, Model } = require("../init/dbconfig");

// Create api for like house by using House Id
// input : houseId
// Output: Like to specific HOuse 
// What to Do : we have to insert like by using house id

async function likeHouse(houseId, userData) {
    // UserData Validation 
    let schema = joi.object({
        id: joi.number().required(),
    })
    let joiParams = {}
    joiParams["id"] = houseId
    let check = await validate(schema, joiParams).catch((error) => {
        return { error }
    })
    log
    if (!check || (check && check.error)) {
        return { error: check.error, status: 400 }
    }
    // check if House Exist in DB
    let house = await House.findOne({ where: { houseId: joiParams.id } }).catch((error) => {
        return { error }
    })
    if (!house || (house && house.error)) {
        return { error: "House Not Found", status: 404 }
    }
    // Check if User Exist in DB
    let user = await User.findOne({ where: { id: userData.id } }).catch((error) => {
        return { error }
    })
    if (!user || (user && user.error)) {
        return { error: "User Not Found", status: 404 }
    }
    // data format
    let data = {
        houseId: joiParams.id,
        userId: userData.id,
        like: true,
        dislike: false
    }

    // Insert like into DB
    let insert = await LikeDislike.create(data).catch((error) => {
        return { error }
    })
    if (!insert || (insert && insert.error)) {
        return { error: "House Not Liked Yet!", status: 404 }
    }    // Return Response

    return { data: insert }
}

// Create api for like house by using House Id
// input : houseId
// Output: Like to specific HOuse 
// What to Do : we have to insert like by using house id

async function userlikedHouse(userData) {
    // create Query 
    let query = `SELECT house.houseId, house.bathRooms AS bathrooms,
    house.bedRooms AS bedrooms,house.bldgAreaSqFt AS squareFeet,
    house.price AS price,house.media AS media
    FROM likedislike
    LEFT JOIN house ON house.houseId = likedislike.houseId
    LEFT JOIN user ON user.id = likedislike.userId
    WHERE user.id = :userId;`
    // fetch Data into DB
    let like=await sequelizeCon.query(query,{
        type:QueryTypes.SELECT,
        replacements:{userId:userData.id}
    }).catch((error)=>{
        return {error}
    })
    console.log("like",like);
    if(!like || (like && like.error)){
        return {error:"Internal Server Error",status:500}
    }

    // Return Response
    return {data:like}
}
module.exports = { likeHouse,userlikedHouse }