'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Usuario', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_tipo_usuario: {type: Sequelize.INTEGER, allowNull: false, validate: {notEmpty: true, isInt: true}
        ,references:{
          model: 'Tipo_Usuario',
          key: 'id'
        }
      },
      username: {type: Sequelize.STRING(50), unique: true, allowNull: false, validate: {notEmpty: true, len: [1,50]}},
      password: {type: Sequelize.STRING(100), allowNull: true, validate: {notEmpty: true, len: [1,100]}},
      observacion: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
      estado: {type: Sequelize.CHAR(1), allowNull: false, defaultValue: 'A',
        validate: {notEmpty: true, len: [1,1], isIn: [['A', 'I']], isAlpha: true}
      },

      createdAt: {type: Sequelize.DATE, allowNull: false, defaultValue: Date.now},
      updatedAt: {type: Sequelize.DATE, allowNull: true}
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Usuario');
  }
};