'use strict';
module.exports = (sequelize, DataTypes) => {
  const Trabajador = sequelize.define('Trabajador', {
    id_usuario: {type: DataTypes.INTEGER, allowNull: false, validate: {min: 1, isInt: true}},
    dni: {type: DataTypes.CHAR(8), unique: true, allowNull: true, validate: {notEmpty: true, len: [8,8], isNumeric: true}},
    nombre: {type: DataTypes.STRING(50), allowNull: false, validate: {notEmpty: true, len: [1,50]}},
    apellido: {type: DataTypes.STRING(50), allowNull: false, validate: {notEmpty: true, len: [1,50]}},
    direccion: {type: DataTypes.STRING(150), allowNull: true, validate: {notEmpty: true, len: [1,50]}},
    latitud:{type: DataTypes.DOUBLE, allowNull:true, validate: {isNumeric: true}},
    longitud:{type: DataTypes.DOUBLE, allowNull:true, validate: {isNumeric: true}},
    celular: {type: DataTypes.CHAR(9), allowNull: true, validate: {len: [9,9], isNumeric: true}},
    imagenes: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    validado: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    codigo_verificacion:{type: DataTypes.STRING(10), allowNull: true, 
      get() {
        return() => this.getDataValue('codigo_verificacion')
      }
    },
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