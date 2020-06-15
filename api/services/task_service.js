import * as fs from 'fs';
import * as path from 'path';
import Sequelize from 'sequelize'

export default class TaskService {
	constructor(db){
		this._db = db
	}

	async create(userId,status,description,responsibleId,responsibleName,responsibleEmail,tries){
		const Op = Sequelize.Op
		const models = this._db.sequelize.models
		
		const task = await models.Task.getById(userId,id)
		if(task === null){
			return await models.Task.create({userId,status,description,responsibleId,responsibleName,responsibleEmail,tries})
		}

		return task
	}

	async update(id,userId,status,description,responsibleId,responsibleName,responsibleEmail,tries){
		const Op = Sequelize.Op
		const models = this._db.sequelize.models

		await models.Task.update({userId,status,description,responsibleId,responsibleName,responsibleEmail,tries}, { where: { userId,id } })

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

	async verifyEmail(id){

	}
	
	async createRandomTasks(id){

	}
	
}