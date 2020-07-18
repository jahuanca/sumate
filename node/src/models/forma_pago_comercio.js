'use strict';
module.exports = (sequelize, DataTypes) => {
  const Forma_Pago_Comercio = sequelize.define('Forma_Pago_Comercio', {
    id_forma_pago:{type: DataTypes.INTEGER, allowNull: false, validate:{min:1, isInt:true}},
    id_comercio:{type: DataTypes.INTEGER, allowNull: false, validate:{min:1, isInt:true}},
    cuenta: {type: DataTypes.STRING(20), allowNull: false, validate: {notEmpty: true, len: [1,200]}},
    descripcion: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
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
    tableName: 'Forma_Pago_Comercio'
  });
  Forma_Pago_Comercio.associate = function(models) {
    Forma_Pago_Comercio.belongsTo(models.Forma_Pago, {foreignKey: 'id_forma_pago'});
    Forma_Pago_Comercio.belongsTo(models.Comercio, {foreignKey: 'id_comercio'});
    Forma_Pago_Comercio.hasMany(models.Pedido, {foreignKey: 'id_forma_pago_comercio'})
  };
  return Forma_Pago_Comercio;
};