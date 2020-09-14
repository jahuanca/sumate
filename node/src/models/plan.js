'use strict';
module.exports = (sequelize, DataTypes) => {
  const Plan = sequelize.define('Plan', {
    nombre: {type: DataTypes.STRING(100), allowNull: false, validate: {notEmpty: true, len: [1,100]}},
    precio: {type: DataTypes.DOUBLE, allowNull: false, validate: {isDecimal: true}},
    descripcion: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    cash: {type: DataTypes.INTEGER, allowNull: true, defaultValue: 0},
    deliverys_gratis: {type: DataTypes.INTEGER, allowNull: true, defaultValue: 0},
    duracion:  {type: DataTypes.INTEGER, allowNull: false, validate: {isInt: true}},
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
    tableName: 'Plan'
  });
  Plan.associate = function(models) {
    Plan.hasMany(models.Beneficio_Plan, {foreignKey: 'id_plan'});
  };
  return Plan;
};