//console.log("hello world")

// const fs = require("fs");

// let fileContent = "";

// fs.readFile("index.js" , (err, data) =>{
//     if (err) throw err;
//     fileContent = data.toString();
// } );

// console.log("Data", fileContent)


// const fs = require("fs");

// let fileContent = "";


// const getFileContent = (callback) => {
//     fs.readFile("index.js" , (err, data) =>{
//     if (err) throw err;
//     callback(data.toString());
//     });
// };

// getFileContent((data)=>console.log(data))


const fs = require("fs");

const fs = require("fs");
const http = require("http");


const getFileContent = (callback) => {
    fs.readFile("index.html" , (err, data) =>{
    if (err) throw err;
    callback(data.toString());
    });
};


http.createServer((req, res) => {
    const obj = [{name:"ana"}, {name:"maria"}];
    console.log(req.url);
    getFileContent((data)=>{
        res.end(data);
    });
}).listen(8000);