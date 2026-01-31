import fs from "node:fs";
import http from "node:http";
import WebSocket, {WebSocketServer} from "ws";
import chalk from "chalk";

import {WebSocketConnectionError, CannotRunServerError} from "./errors.js";

// To fetch details about file and server from the command line arguments
export async function getDetails(server, args){
    if(args[2]){
        server.file = args[2];
    }
    if(! args[3]){
        server.PORT = await getPort(3000);
        let msg = chalk.yellow(`Trying to start server at port ${server.PORT}....`);
        console.log(msg);
    }
    else{
        server.PORT = args[3];
        let msg = chalk.yellow(`Trying to start server at port ${server.PORT}`);
        console.log(msg);
    }
}

// To read text from a file
export function readDoc(path){
    try{
        const data = fs.readFileSync(path, "utf8");
        return data;
    }
    catch(err){
        throw new Error(err);
    }
}

// To ensure reading when race condition can occur
// If the path does not exist the program will run indefinitely
export function raceRead(path){
    let flag = true;
    let data;
    while(flag){
        try{
            data = readDoc(path);
            return data;
        }
        catch{}
    }
    return data;
}

// To get command line options
export function getOptions(args){
    let optionArgs = [];
    let i = 0;
    while(i < args.length && i >= 0){
        if(args[i][0] == "-"){
            optionArgs.push(args[i]);
            args.splice(i, 1);
            i --;
        }
        else{
            i ++;
        }
    }
    return optionArgs;
}

//To send message
export function sendMsg(socketServer, msg){
    socketServer.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(msg);
        }
    });
}

// To get the first available port
export async function getPort(startPort){
    const portLimit = 65000;
    for(let i = startPort; i < portLimit; i ++){
        try{
            const httpServer = http.createServer();
            httpServer.listen(i);
            await connect(httpServer);
            httpServer.close();
            return i;
        }
        catch{}
    }
    throw new CannotRunServerError("Failed to run the server");
}

// To connect to socket
export async function socketConnection(startPort){
    const portLimit = 65000;
    for(let i = startPort; i < portLimit; i ++){
        try{
            const socketServer = new WebSocketServer({port: i});
            await connect(socketServer);
            return socketServer;
        }
        catch{}
    }
    throw new WebSocketConnectionError("Failed to estbalish a web socket connection");
}

// To check if the connection is successful
function connect(server){
    // Remove all listeners
    const connectPromise = new Promise((resolve, reject) => {
        server.once("listening", () => {
            server.removeAllListeners("listening", () => {});
            server.removeAllListeners("error", () => {});
            resolve()
        });
        server.once("error", () => {
            server.removeAllListeners("listening", () => {});
            server.removeAllListeners("errors", () => {});
            reject(new Error())
        });
    });
    return connectPromise;

}
