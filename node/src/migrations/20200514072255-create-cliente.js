'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Cliente', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_usuario: {type: Sequelize.INTEGER, allowNull: false, validate: {isInt: true, min: 1}
        ,references:{
          model:'Usuario',
          key: 'id'
        }
      },
      dni: {type: Sequelize.CHAR(8), unique: true, allowNull: false, validate: {notEmpty: true, len: [8,8], isNumeric: true}},
      nombre: {type: Sequelize.STRING(50), allowNull: false, validate: {notEmpty: true, len: [1,50]}},
      apellido: {type: Sequelize.STRING(50), allowNull: false, validate: {notEmpty: true, len: [1,50]}},
      direccion: {type: Sequelize.STRING(150), allowNull: true, validate: {notEmpty: true, len: [1,50]}},
      celular: {type: Sequelize.CHAR(9), allowNull: true, validate: {len: [9,9], isNumeric: true}},
      imagenes: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
      validado: {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false},
      descripcion: {type: Sequelize.STRING(100), allowNull: true, validate: {notEmpty: true, len: [1,100]}},
      observacion: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
      estado: {type: Sequelize.CHAR(1), allowNull: false, defaultValue: 'A',
        validate: {notEmpty: true, len: [1,1], isIn: [['A', 'I']], isAlpha: true}
      },

      createdAt: {type: Sequelize.DATE, allowNull: false, defaultValue: Date.now},
      updatedAt: {type: Sequelize.DATE, allowNull: true}
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Cliente');
  }
};