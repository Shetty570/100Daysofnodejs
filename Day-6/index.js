const http = require("http")
var fs = require('fs')

http.createServer(function(req,res) {
    fs.readFile('./index.html',function(err,data){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(data);
        return res.end();
    });
}).listen(8080);


fs.appendFile("create.txt", "Hellow world", (err)=>{
    if(err) throw err;
    console.log("saved")

})


fs.open('create2.txt','w', (err)=>{
    if (err) throw err;
    console.log("opened")
})



fs.writeFile("create.txt","from writefile function",(err)=>{
    if(err) throw err;
    console.log("writefile")
})


