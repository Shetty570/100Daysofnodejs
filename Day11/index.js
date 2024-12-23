const express = require("express") ;
const path = require("path");



const app = express()

app.use(express.static(path.join(__dirname,'public')));
console.log(path.join(__dirname,'public'))

app.get('/',(req,res)=>{
    res.send("hello static file")
}) 

app.listen(3000,()=>{
    console.log("server running :",3000);
})