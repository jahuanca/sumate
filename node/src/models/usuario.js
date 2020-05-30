'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    id_tipo_usuario: {type: DataTypes.INTEGER, allowNull: false, validate: {min: 1, isInt: true}},
    username: {type: DataTypes.STRING(50), unique: true, allowNull: false, validate: {notEmpty: true, len: [1,50]}},
    password: {type: DataTypes.STRING(100), allowNull: true, validate: {notEmpty: true, len: [1,100]}},
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
    tableName: 'Usuario'
  });
  Usuario.associate = function(models) {
    // associations can be defined here
  };
  return Usuario;
};