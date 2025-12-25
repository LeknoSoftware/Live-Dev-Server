import startServer from "start"

args = process.argv;
let file = args[1];
let PORT = 5000;

startServer(file, PORT);
