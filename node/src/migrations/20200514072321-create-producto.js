'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Producto', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_categoria: {type: Sequelize.INTEGER, allowNull: false, validate: {min:1, isInt: true}
        ,references:{
          model:'Categoria',
          key:'id'
        }
      },
      id_comercio: {type: Sequelize.INTEGER, allowNull: false, validate: {min:1, isInt: true}
        ,references:{
          model:'Comercio',
          key:'id'
        }
      },
      nombre: {type: Sequelize.STRING(200), allowNull: false, validate: {notEmpty: true, len: [1,200]}},
      presentacion: {type: Sequelize.STRING(200), allowNull: false, validate: {notEmpty: true, len: [1,200]}},
      descripcion: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
      observacion: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
      cantidad: {type: Sequelize.INTEGER, allowNull: false, validate: {notEmpty: true, min: 0}},
      peso: {type: Sequelize.DOUBLE, allowNull: true, validate: {min: 0, isDecimal: true}, defaultValue: 0},
      precio: {type: Sequelize.DOUBLE, allowNull: false, validate: {isDecimal: true, min: 0}},
      precio_premium: {type: Sequelize.DOUBLE, allowNull: true, validate: { isDecimal: true}},
      precio_cash: {type: Sequelize.INTEGER, allowNull: true, validate: {isInt: true}},
      tiempo_preparacion: {type: Sequelize.INTEGER, allowNull: false, validate: {isDecimal: true, min: 0}},
      valoracion: {type: Sequelize.DOUBLE, allowNull: true, validate: {isDecimal: true}, defaultValue: 0},
      imagenes: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
      estado: {type: Sequelize.CHAR(1), allowNull: false, defaultValue: 'A',
        validate: {notEmpty: true, len: [1,1], isIn: [['A', 'I']], isAlpha: true}
      },

      createdAt: {type: Sequelize.DATE, allowNull: false, defaultValue: Date.now},
      updatedAt: {type: Sequelize.DATE, allowNull: true}
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Producto');
  }
};