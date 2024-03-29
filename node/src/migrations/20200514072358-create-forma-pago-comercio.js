'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Forma_Pago_Comercio', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_forma_pago:{type: Sequelize.INTEGER, allowNull: false, validate:{min:1, isInt:true},
        references: {
          model: 'Forma_Pago',
          key: 'id'
        }
      },
      id_comercio:{type: Sequelize.INTEGER, allowNull: false, validate:{min:1, isInt:true},
        references: {
          model: 'Comercio',
          key: 'id'
        }
      },
      cuenta: {type: Sequelize.STRING(20), allowNull: false, validate: {notEmpty: true, len: [1,200]}},
      descripcion: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
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
    return queryInterface.dropTable('Forma_Pago_Comercio');
  }
};