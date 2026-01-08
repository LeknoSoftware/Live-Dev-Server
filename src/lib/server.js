import path from "path";
import process from "process";
import fs from "node:fs";
import express from "express";
import chalk from "chalk";

import {CannotRunServerError, CannotFindFileError} from "./errors.js";
import {readDoc, raceRead} from "./utils.js";

class Server{
    static app = express();
    static listener;

    constructor(){
        this.PORT = 3000;
        this.file = undefined;
    }
    // Method to run the server
    run(){
        const __dirname = process.cwd();
        const __present_dirname = import.meta.dirname;
	let filePath = path.join(__dirname, this.file);    
        if(! fs.existsSync(filePath)){
            throw new CannotFindFileError(`Cannot find the file in ${filePath}`);
        }
        Server.app.get(`/${path.join(this.file)}`, (req, res) => {
            let content = raceRead(filePath);
            let additional = readDoc(path.join(__present_dirname, "/../assets/socket.html"));
            content  = content + additional;
            res.send(content);
        });
        Server.app.get("/", (req, res) => {
            res.redirect(`/${path.join(this.file)}`);
        });
        Server.app.use(express.static(__dirname, {index: this.file}));
        Server.listener = Server.app.listen(this.PORT, (error) => {
            if(! error){
                const msg = chalk.green(`Started live dev server at port ${this.PORT}.`);
                console.log(msg);
            }
            else{
                throw new CannotRunServerError(`Failed to run server at port ${this.PORT}.`);
            }
        });
    }

    close(){
        Server.listener.close();
    }
}

export default Server;

