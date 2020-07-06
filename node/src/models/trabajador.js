'use strict';
module.exports = (sequelize, DataTypes) => {
  const Trabajador = sequelize.define('Trabajador', {
    id_persona:{type:DataTypes.INTEGER, allowNull: false,validate: {isInt: true, min: 0}},
    id_usuario: {type: DataTypes.INTEGER, allowNull: false, validate: {min: 1, isInt: true}},
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
  },{
    freezeTableName: true,
    tableName: 'Trabajador'
  });
  Trabajador.associate = function(models) {
    Trabajador.belongsTo(models.Usuario, {foreignKey: 'id_usuario'});
  };
  return Trabajador;
};