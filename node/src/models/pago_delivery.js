'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pago_Delivery = sequelize.define('Pago_Delivery', {
    id_delivery: {type: DataTypes.INTEGER, allowNull: false, validate: {min:1, isInt: true}},
    id_usuario: {type: DataTypes.INTEGER, allowNull: false, validate: {min:1, isInt: true}},
    cantidad: {type: DataTypes.INTEGER, allowNull: false, validate: {min:1, isInt: true}},
    codigo: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    imagenes: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    total: {type: DataTypes.DOUBLE, allowNull: false, validate: {notEmpty: true, min: 0}},
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
    tableName: 'Pago_Delivery'
  });
  Pago_Delivery.associate = function(models) {
    // associations can be defined here
  };
  return Pago_Delivery;
};