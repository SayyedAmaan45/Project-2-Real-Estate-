
let {sequelizeCon,Model,DataTypes}=require("../init/dbconfig");


class House extends Model{}

House.init({
    houseId:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    bathRooms:{
        type:DataTypes.INTEGER(),
        allowNull:false,
    },
    bedRooms:{
        type:DataTypes.INTEGER(),
        allowNull:false
    },
    bldgAreaSqFt:{
        type:DataTypes.STRING(),
        allowNull:false
    },
    price:{
        type:DataTypes.STRING(),
        allowNull:false
    },
    media:{
        type:DataTypes.STRING(),
        allowNull:true
    },
    status:{
        type:DataTypes.TINYINT,
        allowNull:false,
        defaultValue:1
    },
    isActive:{
        type:DataTypes.BOOLEAN,
        defaultValue:true,
        allowNull:false
    },
    isDeleted:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
        allowNull:false
    },
    createdBy:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    updatedBy:{
        type:DataTypes.INTEGER,
        allowNull:true
    }

},{tableName:"house",modelName:"House",sequelize:sequelizeCon,timestamps:false });
// House.sync()

module.exports={House}