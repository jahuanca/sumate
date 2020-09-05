'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Seguidor', {
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
      id_comercio: {type: Sequelize.INTEGER, allowNull: false, validate: {isInt: true, min: 1}
        ,references:{
          model:'Comercio',
          key: 'id'
        }
      },
      estado: {
        type: Sequelize.CHAR(1)
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
    return queryInterface.dropTable('Seguidor');
  }
};