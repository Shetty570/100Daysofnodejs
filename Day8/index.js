import express from "express";
const app = express();

app.get("/about",(req,res)=>{
    res.send("about page");
});
app.get("/contact",(req,res)=>{
    res.send("contact page");
});
app.get("/",(req,res)=>{
    res.send("home page");
});

app.listen(3001);

