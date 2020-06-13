'use strict';
module.exports = (sequelize, DataTypes) => {
  const Asociacion = sequelize.define('Asociacion', {
    id_comercio: {type: DataTypes.INTEGER, allowNull: false, validate: {min:1, isInt: true}},
    id_delivery: {type: DataTypes.INTEGER, allowNull: false, validate: {min:1, isInt: true}},
    descripcion: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    observacion: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    validado: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
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
    tableName: 'Asociacion'
  });
  Asociacion.associate = function(models) {
    Asociacion.belongsTo(models.Comercio, {foreignKey: 'id_comercio'});
    Asociacion.belongsTo(models.Delivery, {foreignKey: 'id_delivery'});
  };
  return Asociacion;
};