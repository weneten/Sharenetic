require("dotenv").config();
const PORT = process.env.PORT;
const INDEX = '/index.html';

const server = require('express')()
    .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

const { Server } = require('ws');
const uuid = require('uuid');
// const Server = require('ws').Server
let CLIENT = {};
const wss = new Server({ server });
wss.on('connection', (ws,req) => {
    // let abc=0;
    // CLIENT[abc]=ws;
    if(req.url.indexOf("id=")!=-1 && CLIENT[ws.id=req.url.slice(req.url.indexOf("id=")+3)]==undefined){
        CLIENT[ws.id]=ws;
    }
    else
    {
        ws.id = uuid.v4();
        CLIENT[ws.id]=ws;
        ws.send(JSON.stringify({id:ws.id}));
    }
    console.log(ws.id+" Connected");
    ws.on('message',(mes)=>{
        console.log(CLIENT[JSON.parse(mes).id]);
        CLIENT[JSON.parse(mes).id].send(mes);
    });
    ws.on('close', () => {
        delete CLIENT[ws.id];
        console.log('Client disconnected');
    });
});

// setInterval(() => {
//     wss.clients.forEach((client) => {
//         client.send(new Date().toTimeString());
//     });
// }, 1006);
