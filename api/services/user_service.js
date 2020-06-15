import * as fs from 'fs';
import * as path from 'path';
import Sequelize from 'sequelize'
import crypto from 'crypto'
import hat from 'hat'

export default class UserService {
	constructor(db){
		this._db = db
	}

	//auth
	async auth(email,password){
		const models = this._db.sequelize.models
		const pwdMD5 = crypto.createHash('md5').update(password.toString()).digest("hex")
		return await models.User.findOne({where:{email,password:pwdMD5}})
	}

	generateApiToken(email,password){
		return Buffer.from([email,password].join(':')).toString('base64')
	}

}