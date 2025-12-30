import fs from "node:fs";
import chalk from "chalk";

import {NoFileEnteredError} from "./errors.js"

// To fetch details about file and server from the command line arguments
function getDetails(Server, args){
    if(! args[2]){
        throw new NoFileEnteredError("Cannot get the file to run.");  
    }
    else{
        Server.file = args[2];
    }		
    if(! args[3]){
        let msg = chalk.yellow("Trying to start server at port 3000....");
        console.log(msg);	
    }
    else{    
        Server.PORT = args[3];
        let msg = chalk.yellow(`Trying to start server at port ${Server.PORT}`);
        console.log(msg);    
    }		
}		

// To read text from a file
function readDoc(path){
    try{
        const data = fs.readFileSync(path, 'utf8');
        return data;
    }		
    catch(err){
        throw new Error(err);	
    }	
}

// To get command line options
function getOptions(args){
    let optionArgs = [];	
    let i = 0;
    while(i < args.length && i >= 0){
        if(args[i][0] == '-'){
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
export {getDetails, readDoc, getOptions};
