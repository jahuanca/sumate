'use strict';
module.exports = (sequelize, DataTypes) => {
  const Seguidor = sequelize.define('Seguidor', {
    
    id_usuario: {type: DataTypes.INTEGER, allowNull: false, validate: {min: 1, isInt: true}},
    id_comercio: {type: DataTypes.INTEGER, allowNull: false, validate: {min: 1, isInt: true}},

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
    tableName: 'Seguidor'
  });
  Seguidor.associate = function(models) {
    // associations can be defined here
  };
  return Seguidor;
};