'use strict';
module.exports = (sequelize, DataTypes) => {
  const Persona = sequelize.define('Persona', {
    dni: {type: DataTypes.CHAR(8), unique: true, allowNull: false, validate: {notEmpty: true, len: [8,8], isNumeric: true}},
    nombre: {type: DataTypes.STRING(50), allowNull: false, validate: {notEmpty: true, len: [1,50]}},
    apellido: {type: DataTypes.STRING(50), allowNull: false, validate: {notEmpty: true, len: [1,50]}},
    direccion: {type: DataTypes.STRING(150), allowNull: true, validate: {notEmpty: true, len: [1,50]}},
    celular: {type: DataTypes.CHAR(9), allowNull: true, validate: {len: [9,9], isNumeric: true}},
    imagenes: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    validado: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    descripcion: {type: DataTypes.STRING(100), allowNull: true, validate: {notEmpty: true, len: [1,100]}},
    observacion: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    estado: {type: DataTypes.CHAR(1), allowNull: false, defaultValue: 'A',
      validate: {notEmpty: true, len: [1,1], isIn: [['A', 'I']], isAlpha: true}
    },

    createdAt: {type: DataTypes.DATE, allowNull: false, defaultValue: Date.now},
    updatedAt: {type: DataTypes.DATE, allowNull: true},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    //visita_id: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    freezeTableName: true,
    tableName: 'Persona'
  });
  Persona.associate = function(models) {
    // associations can be defined here
  };
  return Persona;
};