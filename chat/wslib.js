const WebSocket = require("ws");
const Mensaje = require("./models/mensaje")

const wsConnection = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on("connection", (ws) => {
        sendMessages();

        ws.on("message", (message) => {
            console.log(JSON.parse(message));
            Mensaje.create(JSON.parse(message)).then(result=>{
                sendMessages();
            });

        });
    });

    sendMessages = () => {
        Mensaje.findAll().then(result=>{
            wss.clients.forEach((client) => {
                client.send(JSON.stringify(result));
            });
        });
    };

    exports.sendMessages = sendMessages
};

exports.wsConnection = wsConnection;