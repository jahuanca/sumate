'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Trabajador', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_persona:{type:Sequelize.INTEGER, allowNull: false,validate: {isInt: true, min: 0}
        ,references:{
          model:'Persona',
          key:'id'
        }
      },
      email: {type: Sequelize.STRING(100), allowNull: false, validate: {notEmpty: true, isEmail: true, len: [1,100]}},
      password: {type: Sequelize.STRING(20), allowNull: false, validate: {notEmpty: true, len: [4,20]}},
      observacion: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
      estado: {type: Sequelize.CHAR(1), allowNull: false, defaultValue: 'A',
        validate: {notEmpty: true, len: [1,1], isIn: [['A', 'I']], isAlpha: true}
      },

      createdAt: {type: Sequelize.DATE, allowNull: false, defaultValue: Date.now},
      updatedAt: {type: Sequelize.DATE, allowNull: true}
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Trabajador');
  }
};