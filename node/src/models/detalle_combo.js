'use strict';
module.exports = (sequelize, DataTypes) => {
  const Detalle_Combo = sequelize.define('Detalle_Combo', {
    id_combo: {type: DataTypes.INTEGER, allowNull: false, validate: {min:1, isInt: true}},
    id_producto: {type: DataTypes.INTEGER, allowNull: false, validate: {min:1, isInt: true}},
    cantidad: {type: DataTypes.INTEGER, allowNull: false, validate: {min:1, isInt: true}},
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
    tableName: 'Detalle_Combo'
  });
  Detalle_Combo.associate = function(models) {
    Detalle_Combo.belongsTo(models.Combo, {foreignKey: 'id_combo'});
    Detalle_Combo.belongsTo(models.Producto, {foreignKey: 'id_producto'});
  };
  return Detalle_Combo;
};