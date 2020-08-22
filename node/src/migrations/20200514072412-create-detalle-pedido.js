'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Detalle_Pedido', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_pedido: {type: Sequelize.INTEGER, allowNull: false, validate: {min:1, isInt: true}
        ,references:{
          model:'Pedido',
          key:'id'
        }
      },
      id_producto: {type: Sequelize.INTEGER, allowNull: false, validate: {min:1, isInt: true}
        ,references:{
          model:'Producto',
          key:'id'
        }
      },
      cantidad: {type: Sequelize.INTEGER, allowNull: false, validate: {min:1, isInt: true}},
      precio: {type: Sequelize.DOUBLE, allowNull: false, validate: {min:0, isDecimal: true}},
      peso: {type: Sequelize.DOUBLE, allowNull: true, validate: {min:0, isInt: true}},
      subtotal: {type: Sequelize.DOUBLE, allowNull: false, validate: {isDecimal: true, min: 0}},
      observacion: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
      estado: {type: Sequelize.CHAR(1), allowNull: false, defaultValue: 'A',
        validate: {notEmpty: true, len: [1,1], isIn: [['A', 'I']], isAlpha: true}
      },

      createdAt: {type: Sequelize.DATE, allowNull: false, defaultValue: Date.now},
      updatedAt: {type: Sequelize.DATE, allowNull: true}
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Detalle_Pedido');
  }
};