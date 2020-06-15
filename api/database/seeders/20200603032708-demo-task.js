'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tasks', [{
      "id": 1,
      "userId":1,
      "responsibleId": 1,
      "responsibleName": "Vinicius F Stroher",
      "responsibleEmail": "viniciusferreirawk@gmail.com",
      "description": "Tarefa de teste 1",
      "status": "PENDING",
      "tries": 0,
      "createdAt": "2020-06-15 12:54:47",
      "updatedAt": "2020-06-15 12:54:47"
    },{
      "id": 2,
      "userId":1,
      "responsibleId": 1,
      "responsibleName": "Vinicius F Stroher",
      "responsibleEmail": "viniciusferreirawk@gmail.com",
      "description": "Tarefa de teste 2",
      "status": "COMPLETED",
      "tries": 0,
      "createdAt": "2020-06-15 12:54:47",
      "updatedAt": "2020-06-15 12:54:47"
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tasks', null, {});
  }
};
