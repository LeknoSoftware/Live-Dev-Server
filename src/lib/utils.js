import fs from "node:fs";
import WebSocket from "ws";
import chalk from "chalk";

// To fetch details about file and server from the command line arguments
function getDetails(server, args){
    if(args[2]){
        server.file = args[2];
    }
    if(! args[3]){
        let msg = chalk.yellow("Trying to start server at port 3000....");
        console.log(msg);
    }
    else{
        server.PORT = args[3];
        let msg = chalk.yellow(`Trying to start server at port ${server.PORT}`);
        console.log(msg);
    }
}

// To read text from a file
function readDoc(path){
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
function raceRead(path){
    let flag = true;
    let data;
    while(flag){
        try{
            data = readDoc(path);
            return data;
        }
        catch{
            // Do nothing
            flag = true;
        }
    }
    return data;
}

// To get command line options
function getOptions(args){
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
function sendMsg(socketServer, msg){
    socketServer.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(msg);
        }
    });
}

export {getDetails, readDoc, getOptions, sendMsg, raceRead};
