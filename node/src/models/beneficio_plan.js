'use strict';
module.exports = (sequelize, DataTypes) => {
  const Beneficio_Plan = sequelize.define('Beneficio_Plan', {
    id_beneficio: {type: DataTypes.INTEGER, allowNull: false, validate: {min: 1, isInt: true}},
    id_plan: {type: DataTypes.INTEGER, allowNull: false, validate: {min: 1, isInt: true}},
    descripcion: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    restriccion: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    
    //other fields

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
    tableName: 'Beneficio_Plan'
  });
  Beneficio_Plan.associate = function(models) {
    // associations can be defined here
  };
  return Beneficio_Plan;
};