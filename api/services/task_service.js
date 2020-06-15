import * as fs from 'fs';
import * as path from 'path';
import Sequelize from 'sequelize'
import axios from 'axios'

export default class TaskService {
	constructor(db){
		this._db = db
	}

	async create(userId,status,description,responsibleName,responsibleEmail,tries){
		const Op = Sequelize.Op
		const models = this._db.sequelize.models
		
		return await models.Task.create({userId,status,description,responsibleName,responsibleEmail,tries})
		
	}

	async update(id,userId,status,description,responsibleName,responsibleEmail,tries){
		const Op = Sequelize.Op
		const models = this._db.sequelize.models

		await models.Task.update({userId,status,description,responsibleName,responsibleEmail,tries}, { where: { userId,id } })

		return await this.getById(userId,id)
	}

	async getList(){
		const models = this._db.sequelize.models
		return await models.Task.findAll()
	}

	async getByUser(userId){
		const models = this._db.sequelize.models
		return await models.Task.findAll({where:{userId}})
	}

	async getById(userId,id){
		const models = this._db.sequelize.models
		return await models.Task.findOne({where:{userId,id}})
	}

	async verifyEmail(email){
		return new Promise(function(resolve,reject){
			const token = 'f20f7ae318c34b92ee6a685fac758feb'
			axios.get('http://apilayer.net/api/check?access_key='+token+'&email='+email, {})
			.then((res) => {
			  // console.log(`statusCode: ${res.statusCode}`)
			  resolve(res.data)
			})
			.catch((error) => {
			  reject(error)
			})
		})
	}
	
	async generateCatDogRandomTasks(userId){
		return new Promise(function(resolve,reject){
			axios.get('https://cat-fact.herokuapp.com/facts/random', {})
			.then((res) => {
			  console.log(`statusCode: ${res.statusCode}`)
			  resolve(res.data)
			})
			.catch((error) => {
			  reject(error)
			})
		})
		
	}



	async generateRandomTasks(userId){
		const status = 'PENDING'
		const tries = 0
		const responsibleName ="Eu"
		const responsibleEmail = "eu@me.com"
		for(let iRandomTask = 0 ; iRandomTask < 3 ; iRandomTask++){
			let catDogData = await this.generateCatDogRandomTasks(userId)
			let description = catDogData.text
			await this.create(userId,status,description,responsibleName,responsibleEmail,tries)
		}
	    
	}
	
}