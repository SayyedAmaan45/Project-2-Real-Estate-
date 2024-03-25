
let {sequelizeCon,Model,DataTypes}=require("../init/dbconfig");


class LikeDislike extends Model{}

LikeDislike.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    houseId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    like:{
        type:DataTypes.BOOLEAN,
        allowNull:true
    },
    dislike:{
        type:DataTypes.BOOLEAN,
        allowNull:true
    }


},{tableName:"likeDislike",modelName:"LikeDislike",sequelize:sequelizeCon,timestamps:false });
LikeDislike.sync()

module.exports={LikeDislike}