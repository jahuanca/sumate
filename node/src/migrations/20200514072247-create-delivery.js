'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Delivery', {
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
      ruc: {type: Sequelize.STRING(11), allowNull: false, validate: {notEmpty: true, len: [11,11]}},
      nombre: {type: Sequelize.STRING(100), allowNull: false, validate: {notEmpty: true, len: [1,100]}},
      razon_social: {type: Sequelize.STRING(100), allowNull: false, validate: {notEmpty: true, len: [1,100]}},
      direccion: {type: Sequelize.STRING(100), allowNull: false, validate: {notEmpty: true, len: [1,100]}},
      latitud:{type: Sequelize.DOUBLE, allowNull:false, validate: {isNumeric: true}},
      longitud:{type: Sequelize.DOUBLE, allowNull:false, validate: {isNumeric: true}},
      celular: {type: Sequelize.STRING(9), allowNull: false, validate: {notEmpty: true, len: [9,9]}},

      facebook: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [0,200]}},
      instagram: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [0,200]}},
      whatsapp: {type: Sequelize.STRING(20), allowNull: true, validate: {notEmpty: true, len: [0,20]}},

      validado: {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false},
      hora_apertura: {type: Sequelize.DATE, allowNull: false},
      hora_cierre: {type: Sequelize.DATE, allowNull: false},
      valoracion: {type: Sequelize.DOUBLE, allowNull: true, validate: {isDecimal: true}, defaultValue: 0},
      imagenes: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
      condicion: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
      restriccion: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
      descripcion: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
      observacion: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
      estado: {type: Sequelize.CHAR(1), allowNull: false, defaultValue: 'A',
        validate: {notEmpty: true, len: [1,1], isIn: [['A', 'I']], isAlpha: true}
      },

      createdAt: {type: Sequelize.DATE, allowNull: false, defaultValue: Date.now},
      updatedAt: {type: Sequelize.DATE, allowNull: true}
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Delivery');
  }
};