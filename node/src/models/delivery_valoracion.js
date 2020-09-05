'use strict';
module.exports = (sequelize, DataTypes) => {
  const DeliveryValoracion = sequelize.define('Delivery_Valoracion', {
    //TODO: crear metodo de agregar valoracion, cambiar valoracion  y ver si ya se valoro (id_producto y usuario unique)
    id_usuario: {type: DataTypes.INTEGER, allowNull: false, validate: {min: 1, isInt: true}},
    id_delivery: {type: DataTypes.INTEGER, allowNull: false, validate: {min: 1, isInt: true}},
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
    tableName: 'Delivery_Valoracion'
  });
  DeliveryValoracion.associate = function(models) {
    // associations can be defined here
  };
  return DeliveryValoracion;
};