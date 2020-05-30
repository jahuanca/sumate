'use strict';
module.exports = (sequelize, DataTypes) => {
  const Detalle_Pedido = sequelize.define('Detalle_Pedido', {
    id_pedido: {type: DataTypes.INTEGER, allowNull: false, validate: {min:1, isInt: true}},
    id_producto: {type: DataTypes.INTEGER, allowNull: false, validate: {min:1, isInt: true}},
    cantidad: {type: DataTypes.INTEGER, allowNull: false, unique: true, validate: {min:1, isInt: true}},
    peso: {type: DataTypes.DOUBLE, allowNull: false, unique: true, validate: {min:1, isInt: true}},
    subtotal: {type: DataTypes.DOUBLE, allowNull: false, validate: {notEmpty: true, min: 0}},
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
    tableName: 'Detalle_Pedido'
  });
  Detalle_Pedido.associate = function(models) {
    // associations can be defined here
  };
  return Detalle_Pedido;
};