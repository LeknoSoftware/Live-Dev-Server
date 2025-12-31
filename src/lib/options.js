import {readDoc} from "./utils.js";
import {InvalidOptionError} from "./errors.js";

const supported = ["--help", "-h"];


function options(optionArgs){
    checkOptions(optionArgs)
    const __dirname = import.meta.dirname;	
    if(optionArgs.includes("--help") || optionArgs.includes("-h")){
        const help = readDoc(__dirname + "/../../docs/help.txt");
        console.log(help);
    }
}		

function checkOptions(optionArgs){
    const errorMsg = "Invalid option(s) passed.\n" + 
					 "Run lds --help for knowing valid arguments.";		
    optionArgs.forEach((arg) => {
        if(! supported.includes(arg)){	
            throw new InvalidOptionError(errorMsg);
        }	
    });
}

export default options;
