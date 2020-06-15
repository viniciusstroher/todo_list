'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },

      status: {
        type: Sequelize.STRING
      },

      description: {
        type: Sequelize.STRING
      },

      responsibleId: {
        type: Sequelize.INTEGER
      },

      responsibleName: {
        type: Sequelize.STRING
      },

      responsibleEmail: {
        type: Sequelize.STRING
      },

      tries:{
        type: Sequelize.INTEGER,
        defaultValue: 0
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tasks');
  }
};