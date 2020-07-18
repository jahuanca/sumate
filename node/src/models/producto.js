'use strict';
module.exports = (sequelize, DataTypes) => {
  const Producto = sequelize.define('Producto', {
    id_categoria: {type: DataTypes.INTEGER, allowNull: false, validate: {min:1, isInt: true}},
    id_comercio: {type: DataTypes.INTEGER, allowNull: false, validate: {min:1, isInt: true}},
    nombre: {type: DataTypes.STRING(200), allowNull: false, validate: {notEmpty: true, len: [1,200]}},
    presentacion: {type: DataTypes.STRING(200), allowNull: false, validate: {notEmpty: true, len: [1,200]}},
    descripcion: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    observacion: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    cantidad: {type: DataTypes.INTEGER, allowNull: false, validate: {isInt: true, min: 0}},
    peso: {type: DataTypes.DOUBLE, allowNull: true, validate: {min: 0, isDecimal: true}, defaultValue: 0},
    precio: {type: DataTypes.DOUBLE, allowNull: false, validate: {isDecimal: true, min: 0}},
    tiempo_preparacion: {type: DataTypes.INTEGER, allowNull: false, validate: {isInt: true, min: 0}},
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
    tableName: 'Producto'
  });
  Producto.associate = function(models) {
    Producto.belongsTo(models.Categoria, {foreignKey: 'id_categoria', as: 'Categoria'})
    Producto.belongsTo(models.Comercio, {foreignKey: 'id_comercio'})
  };
  return Producto;
};