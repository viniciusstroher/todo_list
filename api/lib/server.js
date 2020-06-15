import Logger from './logger.js'


export class Server{
	
	constructor(server,port){
		this._server = server
		this._port = port
	}

	getServer(){
		return this._server
	}

	start(){
		Logger.log(`Start server at ${this._port}.`)
		this._server.listen(this._port)
	}
	
};