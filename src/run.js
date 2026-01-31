import chokidar from "chokidar";
import chalk from "chalk";

import {Server, getDetails, options} from "./index.js";
import {getOptions, sendMsg, socketConnection} from "./index.js";

export default async function run(args){
    const optionArgs = getOptions(args);
    options(optionArgs);
    if(! args[2] && optionArgs.length == 0){
        const msg = "This is housecat, run 'housecat --help' for more";
        console.log(msg);
        return;
    }
    if(! args[2]){
        return;
    }
    const socketServer = await socketConnection(8080);
    const server = new Server();
    await getDetails(server, args);
    server.run(socketServer.options.port);
    chokidar.watch(".", {
        ignoreInitial: true,
        awaitWriteFinish: true,
        usePolling: true,
        interval: 10,
    }).on("all", () => {
        const msg = chalk.italic("Changes detected, reloading page");
        console.log(msg);
        sendMsg(socketServer, "refresh");
    });
}
