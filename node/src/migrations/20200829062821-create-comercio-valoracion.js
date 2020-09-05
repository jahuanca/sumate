'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Comercio_Valoracion', {
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
      id_comercio: {type: Sequelize.INTEGER, allowNull: false, validate: {min: 1, isInt: true}
        ,references:{
          model:'Comercio',
          key: 'id'
        }
      },
      valoracion: {type: Sequelize.INTEGER, allowNull: false, validate: {min: 1, isInt: true}},
      comentario: {type: Sequelize.STRING, allowNull: true},

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
    return queryInterface.dropTable('Comercio_Valoracion');
  }
};