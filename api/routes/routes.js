
import bodyParser from 'body-parser'
import UserService from '../services/user_service.js'
import TaskService from '../services/task_service.js'

import express from 'express'
import cors from 'cors'

export class AppRoutes {
	constructor(app,db){
		this._app = app
		this._db = db
	}

	bindAppRoutes(){

		let that = this 
		this._app.getServer().use(bodyParser.json());

		let authMdleware =async function (req, res, next) {
  			const token = req.headers["x-access-token"] || req.headers["authorization"]
  			
			if (!token) {
				return res.status(401).jsonp({sucess:false,msg:'Acess Denied. Must pass the token.'})
			}

			try {
				//decode basic auth
			    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
			    const [email,password] = Buffer.from(b64auth, 'base64').toString().split(':')
			    
			    const us = new UserService(that._db)
		    	const authenticated = await us.auth(email,password)

			    if (authenticated === null) {
				    return res.status(401).jsonp({sucess:false,msg:'invalid user.'})
				}else{
					req.user = authenticated
				}

			} catch (ex) {
			    return res.status(401).jsonp({sucess:false,msg:'invalid token.'})
			}
  			next();
		}

		let router = express.Router()

		router.get('/', (req, res, next) => {
			res.status(200).jsonp({welcome:"Welcome!"});
		})

		.post('/auth',async  (req, res) => {
			var header=req.headers['authorization']||'',       
		      token=header.split(/\s+/).pop()||'',            
		      auth=new Buffer.from(token, 'base64').toString(),    
		      parts=auth.split(/:/),                          
		      email=parts[0],
		      password=parts[1];
			if(!email || !password){
		    	return res.status(401).jsonp({sucess:false,msg:"pass basic auth"});
		    }else{
		    	const us = new UserService(that._db)
		    	const authenticated = await us.auth(email,password)
		    	if(authenticated === null){
			    	return res.status(401).jsonp({sucess:false,msg:"invalid password"});
			    }else{
			    	return res.status(200).jsonp({sucess:true,msg:"Auth success",authorization: us.generateApiToken(email,password)});
			    }
		    }
		})
		.get('/tasks', authMdleware,async  (req, res) => {
	    	const userId = req.user.id
	    	const ts = new TaskService(that._db)
	    	
	    	if(req.query["type"] == "request_new"){
	    		await ts.generateRandomTasks(userId)
	    	}

	    	try{
	    		const task = await ts.getByUser(userId)
		    	return res.status(200).jsonp(task);
	    	}catch(ex){
	    		return res.status(500).jsonp({});
	    	}
		})
		.get('/tasks/:id', authMdleware,async  (req, res) => {
	    	const userId = req.user.id
	    	const ts = new TaskService(that._db)

	    	try{
	    		const id = req.params.id
	    		const task = await ts.getById(userId,id)
		    	return res.status(200).jsonp(task);
	    	}catch(ex){
	    		return res.status(500).jsonp({});
	    	}
	    	
		})
		.post('/tasks', authMdleware,async  (req, res) => {
	    	const userId = req.user.id
	    	const status = req.body['status'] || null
	    	const description = req.body['description'] || null
	    	const responsibleName = req.body['responsibleName'] || null
	    	const responsibleEmail = req.body['responsibleEmail'] || null
	    	const tries = req.body['tries'] || 0
	    	
	    	const ts = new TaskService(that._db)

	    	try{
		    	const task = await ts.create(userId,status,description,responsibleName,responsibleEmail,tries)
		    	return res.status(201).jsonp(task);
	    	}catch(ex){
	    		return res.status(500).jsonp({});
	    	}
		})
		.put('/tasks/:id', authMdleware,async  (req, res) => {
	    	const userId = req.user.id
	    	const status = req.body['status'] || null
	    	const description = req.body['description'] || null
	    	const responsibleName = req.body['responsibleName'] || null
	    	const responsibleEmail = req.body['responsibleEmail'] || null
	    	const tries = req.body['tries'] || 0
	    	
	    	const ts = new TaskService(that._db)

	    	try{
	    		const id = req.params.id || null
		    	const task = await ts.update(id,userId,status,description,responsibleName,responsibleEmail,tries)
		    	return res.status(202).jsonp(task);
	    	}catch(ex){
	    		console.log(ex)
	    		return res.status(500).jsonp({});
	    	}
		})

		.post('/tasks', authMdleware,async  (req, res) => {
	    	const userId = req.user.id
	    	const status = req.body['status'] || null
	    	const description = req.body['description'] || null
	    	const responsibleName = req.body['responsibleName'] || null
	    	const responsibleEmail = req.body['responsibleEmail'] || null
	    	const tries = req.body['tries'] || 0
	    	
	    	const ts = new TaskService(that._db)

	    	try{
		    	const task = await ts.create(userId,status,description,responsibleName,responsibleEmail,tries)
		    	return res.status(201).jsonp(task);
	    	}catch(ex){
	    		return res.status(500).jsonp({});
	    	}
		})

		.get('/verify_email', authMdleware,async  (req, res) => {
	    	const email = req.query['email'] || null
	    	const ts = new TaskService(that._db)

	    	try{
		    	const emailData = await ts.verifyEmail(email)
		    	return res.status(200).jsonp(emailData);
	    	}catch(ex){
	    		console.log(ex)
	    		return res.status(500).jsonp({});
	    	}
		})

		this._app.getServer().use('*', cors())
		this._app.getServer().use('/api',router)
	}
}