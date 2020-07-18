'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pedido = sequelize.define('Pedido', {
    id_cliente: {type: DataTypes.INTEGER, allowNull: false, validate: {min:1, isInt: true}},
    id_tarifario: {type: DataTypes.INTEGER, allowNull: true, validate: {min:1, isInt: true}},
    id_tipo_envio: {type: DataTypes.INTEGER, allowNull: false, validate: {min:1, isInt: true}},
    id_forma_pago_comercio: {type: DataTypes.INTEGER, allowNull: false, validate: {min:1, isInt: true}},
    id_estado_pedido: {type: DataTypes.INTEGER, allowNull: false, validate: {min:1, isInt: true}},
    direccion: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    referencia: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    latitud: {type: DataTypes.DOUBLE, allowNull: true, validate: {isDecimal: true}},
    longitud: {type: DataTypes.DOUBLE, allowNull: true, validate: {isDecimal: true}},
    peso: {type: DataTypes.DOUBLE, allowNull: true, validate: {min: 0, isDecimal: true}, defaultValue: 0},
    tarifa: {type: DataTypes.DOUBLE, allowNull: true, validate: {min:0, isDecimal: true}},
    total: {type: DataTypes.DOUBLE, allowNull: false, validate: {notEmpty: true, min: 0}},
    observacion: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
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
    tableName: 'Pedido'
  });
  Pedido.associate = function(models) {
    Pedido.belongsTo(models.Tipo_Envio, {foreignKey: 'id_tipo_envio'});
    Pedido.belongsTo(models.Forma_Pago_Comercio, {foreignKey: 'id_forma_pago_comercio'});
    Pedido.belongsTo(models.Estado_Pedido, {foreignKey: 'id_estado_pedido'});
    Pedido.belongsTo(models.Cliente, {foreignKey: 'id_cliente'});
    Pedido.belongsTo(models.Tarifario, {foreignKey: 'id_tarifario'});
    Pedido.hasMany(models.Detalle_Pedido, {foreignKey: 'id_pedido'});
  };
  return Pedido;
};