'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Detalle_Pago_Comercio', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_pago_comercio: {type: Sequelize.INTEGER, allowNull: false, validate: {min:1, isInt: true}
        ,references:{
          model:'Pago_Comercio',
          key:'id'
        }
      },
      id_pedido: {type: Sequelize.INTEGER, allowNull: false, unique: true, validate: {min:1, isInt: true}
        ,references:{
          model:'Pedido',
          key:'id'
        }
      },
      monto: {type: Sequelize.DOUBLE, allowNull: false, validate: {notEmpty: true, min: 0}},
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
    return queryInterface.dropTable('Detalle_Pago_Comercio');
  }
};