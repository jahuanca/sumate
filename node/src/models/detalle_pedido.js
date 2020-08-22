'use strict';

module.exports = (sequelize, DataTypes) => {
  const Detalle_Pedido = sequelize.define('Detalle_Pedido', {
    id_pedido: {type: DataTypes.INTEGER, allowNull: false, validate: {min:1, isInt: true}},
    id_producto: {type: DataTypes.INTEGER, allowNull: false, validate: {min:1, isInt: true}},
    cantidad: {type: DataTypes.INTEGER, allowNull: false, validate: {min:1, isInt: true}},
    precio: {type: DataTypes.DOUBLE, allowNull: false, validate: {min:0, isDecimal: true}},
    peso: {type: DataTypes.DOUBLE, allowNull: true, validate: {min:0, isInt: true}},
    subtotal: {type: DataTypes.DOUBLE, allowNull: false, validate: {isDecimal: true, min: 0}},
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
    Detalle_Pedido.belongsTo(models.Pedido, {foreignKey: 'id_pedido'});
    Detalle_Pedido.belongsTo(models.Producto, {foreignKey: 'id_producto'});
  };

  const reducirInventario = async (detalle,options) => {
    
    await get(sequelize.models.Producto.
      decrement(['cantidad'], { by: detalle.cantidad, where: { id: detalle.id_producto }}))
  }

  const reponerInventario = async (detalle,options) => {
    if (detalle.changed('estado')) {
      if(detalle.dataValues.estado=='I'){
        await get(sequelize.models.Producto.increment(['cantidad', detalle.cantidad], { where: { id: detalle.id_producto }}))
      }
    }
  }

  Detalle_Pedido.addHook('beforeCreate', reducirInventario);
  Detalle_Pedido.addHook('beforeUpdate', reponerInventario);
  return Detalle_Pedido;
};

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}