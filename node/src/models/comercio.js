'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comercio = sequelize.define('Comercio', {
    id_tipo_comercio: {type: DataTypes.INTEGER, allowNull: false, validate: {isInt: true, min: 1}},
    ruc: {type: DataTypes.STRING(11), allowNull: false, validate: {notEmpty: true, len: [11,11]}},
    nombre: {type: DataTypes.STRING(100), allowNull: false, validate: {notEmpty: true, len: [1,100]}},
    razon_social: {type: DataTypes.STRING(100), allowNull: false, validate: {notEmpty: true, len: [1,100]}},
    direccion: {type: DataTypes.STRING(100), allowNull: false, validate: {notEmpty: true, len: [1,100]}},
    celular: {type: DataTypes.STRING(9), allowNull: false, validate: {notEmpty: true, len: [9,9]}},
    validado: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    hora_apertura: {type: DataTypes.DATE, allowNull: false},
    hora_cierre: {type: DataTypes.DATE, allowNull: false},
    username: {type: DataTypes.STRING(50), allowNull: false, validate: {notEmpty: true, len: [1,50]}},
    password: {type: DataTypes.STRING(20), allowNull: false, validate: {notEmpty: true, len: [1,20]}},
    imagen: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    observacion: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    estado: {type: DataTypes.CHAR(1), allowNull: false, defaultValue: 'A',
      validate: {notEmpty: true, len: [1,1], isIn: [['A', 'I']], isAlpha: true}
    },

    createdAt: {type: DataTypes.DATE, allowNull: false, defaultValue: Date.now},
    updatedAt: {type: DataTypes.DATE, allowNull: true},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    freezeTableName: true,
    tableName: 'Comercio'
  });
  Comercio.associate = function(models) {
  };
  return Comercio;
};