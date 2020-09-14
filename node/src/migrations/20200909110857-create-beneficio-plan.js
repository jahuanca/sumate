'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Beneficio_Plan', {
      
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_beneficio: {type: Sequelize.INTEGER, allowNull: false, validate: {min: 1, isInt: true}
        ,references:{
          model:'Beneficio',
          key: 'id'
        }
      },
      id_plan: {type: Sequelize.INTEGER, allowNull: false, validate: {min: 1, isInt: true}
        ,references:{
          model:'Plan',
          key: 'id'
        }
      },
      descripcion: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
      restriccion: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},

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
    return queryInterface.dropTable('Beneficio_Plan');
  }
};