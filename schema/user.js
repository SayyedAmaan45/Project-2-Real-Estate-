let {sequelizeCon,Model,DataTypes,Op}=require("../init/dbconfig")

class User extends Model{}

User.init({
    id:{
        type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true,allowNull:false
    },
    name:{
        type:DataTypes.STRING(155),allowNull:false
    },
    emailID:{
    type:DataTypes.STRING(255),allowNull:false,unique:true
    },
    password:{
        type:DataTypes.STRING(400),allowNull:false
    },
    token:{
        type:DataTypes.STRING(500)
    }

},{tableName:"user",modelName:"User",sequelize:sequelizeCon});
// User.sync()

module.exports={User}