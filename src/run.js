import chokidar from "chokidar";
import chalk from "chalk";

import {Server, getDetails, options, getOptions} from "./index.js";

function run(args){
    const optionArgs = getOptions(args); 	
    options(optionArgs);
    if(! args[2] && optionArgs.length == 0){
        const msg = "Nothing specified, run 'lds --help' for more";  	
        console.log(msg);	
        return;
    }
    if(! args[2]){
        return;
    }		
    const server = new Server();	
    getDetails(server, args);
    server.run();
    // Rerun the server each time any change takes place	
    chokidar.watch('.', {
        ignoreInitial: true,
    }).on('all', () => {
        server.close();	
        rerun(server);
        return;
    });	
}

function rerun(server){
    const msg = chalk.yellow(`Trying to restart server at port ${server.PORT}....`);
    console.log(msg);	
    server.rerun();
    // Rerun the server each time any change takes place	
    chokidar.watch('.', {
        ignoreInitial: true,
    }).on('all', () => {
        server.close();	
        rerun(server);
        return;
    });
}

export default run;
