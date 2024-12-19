const http = require('http');

http.createServer((req,res)=>{
    // res.writeHead(200,{'Content-Type':'text/html'});
    console.log(req.url);

    const url = req.url

    if (url ==='/about'){
        res.write("This is about page")
        res.end()

    }
    else if (url ==='/contact'){
        res.write("This is contact page")
        res.end()
    }
    else{
        res.write("This is Home page")
        res.end()
    }


}).listen(3000,()=>{
    console.log("server running on 3000")

})