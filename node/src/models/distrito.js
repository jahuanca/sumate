'use strict';
module.exports = (sequelize, DataTypes) => {
  const Distrito = sequelize.define('Distrito', {
    id_provincia:{type: DataTypes.INTEGER, allowNull: false, validate:{min:1, isInt:true}},
    nombre: {type: DataTypes.STRING(100), allowNull: false, validate: {notEmpty: true, len: [1,100]}},
    descripcion: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    observacion: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    latitud: {type: DataTypes.DOUBLE, allowNull: false, unique: true, validate: {min:1, isInt: true}},
    longitud: {type: DataTypes.DOUBLE, allowNull: false, unique: true, validate: {min:1, isInt: true}},
    imagenes: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
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
    tableName: 'Distrito'
  });
  Distrito.associate = function(models) {
    Distrito.belongsTo(models.Provincia, {foreignKey: 'id_provincia', as: 'Provincia'});
    Distrito.hasMany(models.Zona, {foreignKey: 'id_distrito'});
  };
  return Distrito;
};