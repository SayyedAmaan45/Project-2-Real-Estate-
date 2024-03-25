let express=require("express")
let authController=require("./controller/auth")
let houseController=require("./controller/house")
let likeController=require("./controller/likeDislike")
let router=express.Router()
let auth = require("./middleware/user")



router.get("/",(req,res)=>{
    return res.send("Welcome to practice project")
})

// User Related Apis
router.post("/Register",authController.register)
router.post("/LoginUser", authController.login)
router.put("/LogoutUser", auth, authController.logout);

// House Related Apis
router.post("/House",auth,houseController.createHouse)
router.get("/House",houseController.list)
router.get("/House/:houseId",houseController.detail)

// House like Related Apis
router.post("/HouseLiked/:houseId",auth,likeController.likeDislike)
router.get('/LikeByUser',auth,likeController.userLikedHouses);

module.exports=router