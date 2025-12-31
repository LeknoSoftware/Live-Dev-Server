import process from "process";
import fs from "node:fs";
import express from "express";
import chalk from "chalk";

import {CannotRunServerError} from "./errors.js";
import {CannotFindFileError} from "./errors.js";

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
	if(! fs.existsSync(__dirname + "/" + this.file)){
            throw new CannotFindFileError(`Cannot find the file in ${__dirname + "/" + this.file}`);
        }	    
        Server.app.get('/', (req, res) => {
            res.sendFile(__dirname + `/${this.file}`);
        });	
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

    rerun(){
        const __dirname = process.cwd();
        Server.app.get('/', (req, res) => {
            res.sendFile(__dirname + `/${this.file}`);
        });		
        Server.listener = Server.app.listen(this.PORT, (error) => {
            if(! error){
                const msg = chalk.green(`Restarted live dev server at port ${this.PORT}.`);	
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

