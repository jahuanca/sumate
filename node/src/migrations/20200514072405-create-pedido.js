'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Pedido', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_cliente: {type: Sequelize.INTEGER, allowNull: false, validate: {min:1, isInt: true}
        ,references:{
          model: 'Cliente',
          key: 'id'
        }
      },
      id_tarifario: {type: Sequelize.INTEGER, allowNull: true, validate: {min:1, isInt: true}
        ,references:{
          model: 'Tarifario',
          key: 'id'
        }
      },
      id_tipo_envio: {type: Sequelize.INTEGER, allowNull: false, validate: {min:1, isInt: true}
        ,references:{
          model: 'Tipo_Envio',
          key: 'id'
        }
      },
      id_forma_pago_comercio: {type: Sequelize.INTEGER, allowNull: false, validate: {min:1, isInt: true}
        ,references:{
          model: 'Forma_Pago_Comercio',
          key: 'id'
        }
      },
      id_estado_pedido: {type: Sequelize.INTEGER, allowNull: false, validate: {min:1, isInt: true}
        ,references:{
          model: 'Estado_Pedido',
          key: 'id'
        }
      },
      direccion: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
      referencia: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
      latitud: {type: Sequelize.DOUBLE, allowNull: true, validate: {isDecimal: true}},
      longitud: {type: Sequelize.DOUBLE, allowNull: true, validate: {isDecimal: true}},
      peso: {type: Sequelize.DOUBLE, allowNull: true, validate: {min: 0, isDecimal: true}, defaultValue: 0},
      tarifa: {type: Sequelize.DOUBLE, allowNull: true, validate: {min: 0, isDecimal: true}},
      total: {type: Sequelize.DOUBLE, allowNull: false, validate: {isDecimal: true, min: 0}, defaultValue: 0},
      total_cash: {type: Sequelize.DOUBLE, allowNull: false, validate: {min:0, isInt: true}, defaultValue: 0},
      observacion: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
      imagenes: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
      estado: {type: Sequelize.CHAR(1), allowNull: false, defaultValue: 'A',
        validate: {notEmpty: true, len: [1,1], isIn: [['A', 'I']], isAlpha: true}
      },

      createdAt: {type: Sequelize.DATE, allowNull: false, defaultValue: Date.now},
      updatedAt: {type: Sequelize.DATE, allowNull: true}
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Pedido');
  }
};