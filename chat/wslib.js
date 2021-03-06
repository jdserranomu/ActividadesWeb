const WebSocket = require("ws");
const Mensaje = require("./models/mensaje")

const clients = [];
const messages = [];

const wsConnection = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on("connection", (ws) => {
        clients.push(ws);
        sendMessages();

        ws.on("message", (message) => {
            messages.push(message);
            sendMessages();
        });
    });

    const sendMessages = () => {
        Mensaje.findAll().then(result=>{
            clients.forEach((client) => {
                client.send(JSON.stringify(result));
            });
        });
    };
};

exports.wsConnection = wsConnection;