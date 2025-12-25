#! /usr/bin/env node

import liveDevServer from "../liveDevServer.js";

if(! process.argv[2]){
    //throw new Error("File name not found");
}

let fileName = process.argv[2];
let PORT = 3000;

if(process.argv[3]){
    PORT = process.argv[3];
}

liveDevServer(fileName, PORT);
