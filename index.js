let express=require("express")
let config=require("config")
let routes=require("./routes")
let app=express()
let port=config.get("port")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(routes)

app.listen(port,()=>{
    console.log(`Connected to port${port}`);
})