'use strict';
module.exports = (sequelize, DataTypes) => {
  
  const Task = sequelize.define('Task', {
    userId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    description: DataTypes.STRING,
    responsibleId: DataTypes.INTEGER,
    responsibleName: DataTypes.STRING,
    responsibleName: DataTypes.STRING,
    responsibleEmail: DataTypes.STRING,
    tries: DataTypes.INTEGER,
  }, {});
  
  Task.associate = function(models) {
    // associations can be defined here
    // sequelize.models.Task.hasOne(models.User, { foreignKey:'userId' });
 
  };
  return Task;
};