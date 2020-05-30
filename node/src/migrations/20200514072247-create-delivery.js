'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Delivery', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ruc: {type: Sequelize.STRING(11), allowNull: false, validate: {notEmpty: true, len: [11,11]}},
      nombre: {type: Sequelize.STRING(100), allowNull: false, validate: {notEmpty: true, len: [1,100]}},
      razon_social: {type: Sequelize.STRING(100), allowNull: false, validate: {notEmpty: true, len: [1,100]}},
      direccion: {type: Sequelize.STRING(100), allowNull: false, validate: {notEmpty: true, len: [1,100]}},
      celular: {type: Sequelize.STRING(9), allowNull: false, validate: {notEmpty: true, len: [9,9]}},
      validado: {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false},
      hora_apertura: {type: Sequelize.DATE, allowNull: false},
      hora_cierre: {type: Sequelize.DATE, allowNull: false},
      username: {type: Sequelize.STRING(50), allowNull: false, validate: {notEmpty: true, len: [1,50]}},
      password: {type: Sequelize.STRING(20), allowNull: false, validate: {notEmpty: true, len: [1,20]}},
      condicion: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
      restriccion: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
      observacion: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
      estado: {type: Sequelize.CHAR(1), allowNull: false, defaultValue: 'A',
        validate: {notEmpty: true, len: [1,1], isIn: [['A', 'I']], isAlpha: true}
      },

      createdAt: {type: Sequelize.DATE, allowNull: false, defaultValue: Date.now},
      updatedAt: {type: Sequelize.DATE, allowNull: true}
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Delivery');
  }
};