'use strict';
const crypto = require('crypto')
module.exports = {
  up: async(queryInterface, Sequelize) => {
    const pwd = 'testesaipos@saipos.com.br'
    const pwdMD5 = crypto.createHash('md5').update(pwd).digest("hex")
    return await queryInterface.bulkInsert('Users', [{
      id: 1,
      name: 'Saipos Admin',
      email: 'testesaipos@saipos.com.br',
      password:pwdMD5,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
