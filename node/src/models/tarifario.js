'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tarifario = sequelize.define('Tarifario', {
    id_asociacion: {type: DataTypes.INTEGER, allowNull: false, validate: {min:1, isInt: true}},
    id_zona_destino: {type: DataTypes.INTEGER, allowNull: false, validate: {min:1, isInt: true}},
    precio: {type: DataTypes.DOUBLE, allowNull: false, validate: {notEmpty: true, min: 0}},
    tiempo: {type: DataTypes.INTEGER, allowNull: false, validate: {notEmpty: true, min: 0}},
    descripcion: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    condicion: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    restriccion: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
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
    tableName: 'Pago_Comercio'
  });
  Tarifario.associate = function(models) {
    // associations can be defined here
  };
  return Tarifario;
};