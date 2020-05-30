'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Asociacion', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_comercio: {type: Sequelize.INTEGER, allowNull: false, validate: {min:1, isInt: true}
        ,references:{
          model:'Comercio',
          key:'id'
        }
      },
      id_delivery: {type: Sequelize.INTEGER, allowNull: false, validate: {min:1, isInt: true}
        ,references:{
          model:'Delivery',
          key:'id'
        }
      },
      descripcion: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
      observacion: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
      validado: {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false},
      estado: {type: Sequelize.CHAR(1), allowNull: false, defaultValue: 'A',
        validate: {notEmpty: true, len: [1,1], isIn: [['A', 'I']], isAlpha: true}
      },

      createdAt: {type: Sequelize.DATE, allowNull: false, defaultValue: Date.now},
      updatedAt: {type: Sequelize.DATE, allowNull: true}
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Asociacion');
  }
};