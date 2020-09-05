'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Subscripcion', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      id_usuario: {type: Sequelize.INTEGER, allowNull: false, validate: {min: 1, isInt: true}
        ,references:{
          model:'Usuario',
          key: 'id'
        }
      },
      id_usuario_invito: {type: Sequelize.INTEGER, allowNull: true, validate: {min: 1, isInt: true}
        ,references:{
          model:'Usuario',
          key: 'id'
        }
      },
      monto: {type: Sequelize.DOUBLE, allowNull: true, validate: {min: 0, isDecimal: true}},
      nota: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
      atendido: {type: Sequelize.BOOLEAN, allowNull: true, defaultValue: false},
      dias_agregar: {type: Sequelize.INTEGER, allowNull: true},

      imagenes: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
      
      estado: {type: Sequelize.CHAR(1), allowNull: false, defaultValue: 'A',
        validate: {notEmpty: true, len: [1,1], isIn: [['A', 'I']], isAlpha: true}
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
    return queryInterface.dropTable('Subscripcion');
  }
};