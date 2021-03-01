const fs = require("fs");
const http = require("http");
const axios = require("axios")
// let fileContent; Error tipico asignar a variable dentro de callback por asincronia

// fs.readFile("./codigoClaseNode.js", (err, data)=>{
//     if(err) throw err;
//     console.log("Data", data.toString())
//     // {asar callback a
// });


// function getFileContent(callback){
//     fs.readFile("./codigoClaseNode.js", (err, data)=>{
//         if(err) throw err;
//         callback(data.toString())
//     });
// }
//
// console.log("Data", getFileContent(console.log))
//
// fs.writeFile("./prueba.js", "contenido del archivo", (err)=>{
//    if(err) throw err;
//    console.log("Archivo creado correctamente")
// });


// http.createServer((req, res)=>{
//     const obj = [{name:"ana"}, {name:"daniela"}];
//     // console.log(req);
//     // console.log(req.url);
//     if(req.url == "/api/albums"){
//
//     }else{
//
//     }
//     // res.end(JSON.stringify(obj))
// }).listen(8000);

// function getFileContent(callback){
//     fs.readFile("./codigoClaseNode.js", (err, data)=>{
//         if(err) throw err;
//         callback(data.toString())
//     });
// }
//
//
// http.createServer((req,res)=>{
//     getFileContent(data=>{res.end(data)})
// }).listen(8000);

axios.get("url").then().catch().then();