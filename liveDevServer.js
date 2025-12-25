import express from 'express';

function liveDevServer(fileName, PORT){
	let __dirname = process.cwd();
	const app = express();
	app.get('/', (req, res) => {
	res.sendFile(__dirname + `/${fileName}`);
	});

	app.listen(PORT, (error) => {
		if(! error){
			console.log(`Started live dev server at port ${PORT}.`);
		}
		else{
			//throw new Error(`Failed to run server at port ${PORT}.`);
		}
	});
}

export default liveDevServer;

