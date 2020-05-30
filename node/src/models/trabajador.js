'use strict';
module.exports = (sequelize, DataTypes) => {
  const Trabajador = sequelize.define('Trabajador', {
    id_persona:{type:DataTypes.INTEGER, allowNull: false,validate: {isInt: true, min: 0}},
    email: {type: DataTypes.STRING(100), allowNull: false, validate: {notEmpty: true, isEmail: true, len: [1,100]}},
    password: {type: DataTypes.STRING(20), allowNull: false, validate: {notEmpty: true, len: [4,20]}},
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
  },{
    freezeTableName: true,
    tableName: 'Trabajador'
  });
  Trabajador.associate = function(models) {
    // associations can be defined here
  };
  return Trabajador;
};