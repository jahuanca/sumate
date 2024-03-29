'use strict';
module.exports = (sequelize, DataTypes) => {
  const Zona = sequelize.define('Zona', {
    id_distrito:{type: DataTypes.INTEGER, allowNull: false, validate:{min:1, isInt:true}},
    nombre: {type: DataTypes.STRING(100), allowNull: false, validate: {notEmpty: true, len: [1,100]}},
    descripcion: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    observacion: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    puntos: {type: DataTypes.TEXT, allowNull: false, validate: {notEmpty: true}},
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
    tableName: 'Zona'
  });
  Zona.associate = function(models) {
    Zona.belongsTo(models.Distrito, {foreignKey: 'id_distrito'});
    Zona.hasMany(models.Tarifario, {foreignKey: 'id_zona_destino'});
  };
  return Zona;
};