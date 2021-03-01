const fs = require("fs");
const http = require("http");
const axios = require("axios");
const urlProveedores = "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json";
const urlClientes = "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json";

function getFileContent(callback){
    fs.readFile("./index.html", (err, data)=>{
        if(err) throw err;
        callback(data.toString())
    });
}



http.createServer((req, res)=>{
    getFileContent(fileString=>{
        if(req.url === "/api/proveedores"){
            axios.get(urlProveedores).then(response=>{
                let proveedores = response.data;
                let stringProveedores = "";
                proveedores.forEach(p=>{
                    let stringTemp = `<tr><td>${p.idproveedor}</td><td>${p.nombrecompania}</td><td>${p.nombrecontacto}</td></tr>`;
                    stringProveedores+=stringTemp;
                });
                fileString = fileString.replace("{{contenido}}",stringProveedores);
                res.end(fileString);
            }).catch(err=>{
                console.log(err);
            });
        }else if(req.url === "/api/clientes"){
            axios.get(urlClientes).then(response=>{
                let clientes = response.data;
                let stringClientes = "";
                clientes.forEach(c => {
                    let stringTemp = `<tr><td>${c.idCliente}</td><td>${c.NombreCompania}</td><td>${c.NombreContacto}</td></tr>`;
                    stringClientes += stringTemp;
                });
                fileString = fileString.replace("{{contenido}}", stringClientes);
                res.end(fileString);
            }).catch(err=>{
                console.log(err);
            });
        }else{
            console.log("URL no es correcta");
        }
    });
}).listen(8081);
