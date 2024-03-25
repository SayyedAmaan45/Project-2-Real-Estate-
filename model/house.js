let { House } = require("../schema/house")
let joi = require("joi");
let { validate } = require("../helper/validation");
let { QueryTypes, sequelizeCon, Model } = require("../init/dbconfig");
const { error } = require("console");

// Adding House detail 
// input :NO.bathrooms,No.bedrooms,BuildingAreaTotal as squareFeet, Price, Address,Media(for images)
// Output: House Added Sucessfully
// What to Do : we have to Add House Detail in List

async function createHouse(params, userData) {
    // UserData Validation
    let schema = joi.object({
        noOfBathrooms: joi.number().required(),
        noOfBedrooms: joi.number().required(),
        buildingAreaTotal: joi.string().required(),
        priceOfHouse: joi.string().required(),
        Picture: joi.string().required()
    })
    let check = await validate(schema, params).catch((error) => {
        return { error }
    })
    console.log("check", check);

    if (!check || (check && check.error)) {
        return { error: check.error, status: 404 }
    }
    // Data Formatting
    let data = {
        bathRooms: params.noOfBathrooms,
        bedRooms: params.noOfBedrooms,
        bldgAreaSqFt: params.buildingAreaTotal,
        price: params.priceOfHouse,
        media: params.Picture,
        createdBy: userData.id,
        // updatedBy: userData.id,
    }
    // Insert Data Into DB
    let insert = await House.create(data).catch((error) => {
        return { error }
    })
    console.log("insert", insert);

    if (!insert || (insert && insert.error)) {
        return { error: "House Not Created Yet!", status: 404 }
    }

    let response = {
        id: insert.houseId,
        noOfBathrooms: insert.bathRooms,
        noOfbedrooms: insert.bedRooms,
        buildingAreaTotal: insert.bldgAreaSqFt,
        priceOfHouse: insert.price,
        Picture: insert.media,
        createdBy: insert.createdBy
    }
    // Return Response
    return { data: response }
}

// SHow All House List 
// input : Nothing
// Output: Show All House List
// What to Do : we have to Show House List

async function houseList() {
    let list = await House.findAll().catch((error) => {
        return { error }
    })
    if (!list || (list && list.error)) {
        return { error: "House Cannot Found", status: 403 }
    }
    return { data: list }
}

// SHow Specific House detail 
// input : HouseID
// Output: Show ONE House Detail
// What to Do : we have to Show House Detail of Specific HOuse
async function houseDetail(houseId) {
    // UserDAta Validation
    let schema = joi.object({
        id: joi.number().required()
    })
    let joiParams = {}
    joiParams["id"] = houseId
    let check = await validate(schema, joiParams).catch((error) => {
        return { error }
    })
    console.log("check", check);

    if (!check || (check && check.error)) {
        return { error: check.error, status: 400 }
    }
    // Check IF House Exist
    let house = await House.findOne({ where: { houseId: joiParams.id } }).catch((error) => {
        return { error }
    })
    console.log("house", house);

    if (!house || (house && house.error)) {
        return { error: "HOuse Not Found", status: 404 }
    }
    // Return Response
    return { data: house }
}



module.exports = { createHouse, houseList,houseDetail }