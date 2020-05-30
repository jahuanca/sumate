'use strict';
module.exports = (sequelize, DataTypes) => {
  const Producto = sequelize.define('Producto', {
    id_categoria: {type: DataTypes.INTEGER, allowNull: false, validate: {min:1, isInt: true}},
    id_comercio: {type: DataTypes.INTEGER, allowNull: false, validate: {min:1, isInt: true}},
    nombre: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    descripcion: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    observacion: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    cantidad: {type: DataTypes.INTEGER, allowNull: false, validate: {notEmpty: true, min: 0}},
    peso: {type: DataTypes.DOUBLE, allowNull: false, validate: {min: 0, isDecimal: true}},
    precio: {type: DataTypes.DOUBLE, allowNull: false, validate: {isDecimal: true, min: 0}},
    tiempo_preparacion: {type: DataTypes.INTEGER, allowNull: false, validate: {isInt: true, min: 0}},
    foto_1: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    foto_2: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    foto_3: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    foto_4: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    foto_5: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
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
  Producto.associate = function(models) {
    // associations can be defined here
  };
  return Producto;
};