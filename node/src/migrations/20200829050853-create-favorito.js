'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Favorito', {
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
      id_producto: {type: Sequelize.INTEGER, allowNull: false, validate: {isInt: true, min: 1}
        ,references:{
          model:'Producto',
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
    return queryInterface.dropTable('Favorito');
  }
};