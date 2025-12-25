import express from "express"

const app = express();
function startServer(filePath, PORT){
	app.get("./", (req, res) => {
		res.sendFile(filePath);					
	})		
}

export default startServer;
