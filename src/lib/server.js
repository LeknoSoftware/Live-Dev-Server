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
        let initialPath = path.join(__dirname, this.file);
        if(! fs.existsSync(initialPath)){
            throw new CannotFindFileError(`Cannot find the file in ${filePath}`);
        }

        let socket = readDoc(path.join(__present_dirname, "/../assets/socket.html"));

        Server.app.get("/{*splat}.html", (req, res) => {
            let filePath = path.join(__dirname, req.path);
            let content = raceRead(filePath);
            content  = content + socket;
            res.send(content);
        });
        Server.app.get("/", (req, res) => {
            res.redirect(`/${path.join(this.file)}`);
        });
        Server.app.use(express.static(__dirname, {index: this.file}));
        Server.listener = Server.app.listen(this.PORT, (error) => {
            if(! error){
                const msg = chalk.green(`Started housecat at port ${this.PORT}.`);
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

