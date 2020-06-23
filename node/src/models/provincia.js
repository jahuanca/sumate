'use strict';
module.exports = (sequelize, DataTypes) => {
  const Provincia = sequelize.define('Provincia', {
    id_departamento:{type: DataTypes.INTEGER, allowNull: false, validate:{min:1, isInt:true}},
    nombre: {type: DataTypes.STRING(100), allowNull: false, validate: {notEmpty: true, len: [1,100]}},
    descripcion: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    observacion: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    latitud: {type: DataTypes.DOUBLE, allowNull: false, validate: {min:1, isInt: true}},
    longitud: {type: DataTypes.DOUBLE, allowNull: false, validate: {min:1, isInt: true}},
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
    tableName: 'Provincia'
  });
  Provincia.associate = function(models) {
    Provincia.belongsTo(models.Departamento, {foreignKey: 'id_departamento'});
    Provincia.hasMany(models.Distrito, {foreignKey: 'id_provincia'});
  };
  return Provincia;
};