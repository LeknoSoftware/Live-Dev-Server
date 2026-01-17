import request from "supertest";

import {readDoc} from "../src/lib/utils.js";
import run from "../src/run.js";
import Server from "../src/lib/server.js";

// To avoid printing unnecessay lines
const log = console.log;
console.log = () => {};

// Imitating process.argv
const args = ["path/bin/node", "path/housecat/tests/testPage.js", "tests/index.html"];

run(args);
const app = Server.app;

request(app)
    .get("/tests/index.html")
    .end(check);

function check(err, res){
    if(err){
        throw err;
    }
    let data = readDoc("./tests/index.html");
    data = data + readDoc("./src/assets/socket.html");
    if(data != res.text){
        throw new Error("Received text different from expected text");
    }
    log("Test for checking webpage loading passed!");
    if(Server.listener){
        Server.close();
    }
    process.exit(0);
}
