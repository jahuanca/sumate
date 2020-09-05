'use strict';
module.exports = (sequelize, DataTypes) => {
  const ComercioValoracion = sequelize.define('Comercio_Valoracion', {
    
    id_usuario: {type: DataTypes.INTEGER, allowNull: false, validate: {min: 1, isInt: true}},
    id_comercio: {type: DataTypes.INTEGER, allowNull: false, validate: {min: 1, isInt: true}},
    valoracion: {type: DataTypes.INTEGER, allowNull: false, validate: {min: 1, isInt: true}},
    comentario: {type: DataTypes.STRING, allowNull: true},

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
    tableName: 'Comercio_Valoracion'
  });
  ComercioValoracion.associate = function(models) {
    // associations can be defined here
  };
  return ComercioValoracion;
};