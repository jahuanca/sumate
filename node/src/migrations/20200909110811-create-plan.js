'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Plan', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {type: Sequelize.STRING(100), allowNull: false, validate: {notEmpty: true, len: [1,100]}},
      precio: {type: Sequelize.DOUBLE, allowNull: false, validate: {isDecimal: true}},
      descripcion: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
      cash: {type: Sequelize.INTEGER, allowNull: true, defaultValue: 0},
      deliverys_gratis: {type: Sequelize.INTEGER, allowNull: true, defaultValue: 0},
      duracion:  {type: Sequelize.INTEGER, allowNull: false, validate: {isInt: true}},
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
    return queryInterface.dropTable('Plan');
  }
};
//TODO: editar modelos PRODUCTO, USUARIO, SUBSCRIPCION
//TODO: CREAR modeles PLAN, BENEFICIO, BENEFICIO_PLAN
//TODO: crear SERVICES: PLAN, BENEFICIO, BENEFICIO_PLAN
//TODO: editar modulos: PRODUCTO, USUARIO, SUBSCRIPCION
//TODO: crear modulos PLAN, BENEFICIO, BENEIFICI_PLAN
//TODO: modificar el metodo atender HOOKS que agregue los dias del plan correspondiente
