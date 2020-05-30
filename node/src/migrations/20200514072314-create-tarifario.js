'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tarifario', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_asociacion: {type: Sequelize.INTEGER, allowNull: false, validate: {min:1, isInt: true}
        ,references:{
          model:'Asociacion',
          key: 'id'
        }
      },
      id_zona_destino: {type: Sequelize.INTEGER, allowNull: true, validate: {notEmpty: true, len: [1,200]}
        ,references:{
          model:'Zona',
          key: 'id'
        }
      },
      precio: {type: Sequelize.DOUBLE, allowNull: false, validate: {notEmpty: true, min: 0}},
      tiempo: {type: Sequelize.INTEGER, allowNull: false, validate: {notEmpty: true, min: 0}},
      descripcion: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
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
    return queryInterface.dropTable('Tarifario');
  }
};