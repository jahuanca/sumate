'use strict';
const crypto=require('crypto')
const nexmo=require('../services/nexmo')

module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define('Cliente', {
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
    descripcion: {type: DataTypes.STRING(100), allowNull: true, validate: {notEmpty: true, len: [1,100]}},
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
    tableName: 'Cliente'
  });
  Cliente.associate = function(models) {
    Cliente.belongsTo(models.Usuario, {foreignKey: 'id_usuario'});
  };

  Cliente.generateCodigo = function() {
    return crypto.randomBytes(16).toString('base64').substring(0,10);
  }

  Cliente.encryptPassword = function(plainText, salt) {
      return crypto
          .createHash('RSA-SHA256')
          .update(plainText)
          .update(salt)
          .digest('hex')
  }


  Cliente.prototype.correctCodigo = function(codigo) {
    return codigo === this.codigo_verificacion();
  }

  const setSaltAndPassword = (cliente,options) => {
    if (cliente.changed('celular')) {
      let codigo=Cliente.generateCodigo();
      nexmo.sendMessage('','51'+cliente.celular,`Su código de verificación es ${codigo}. SUMATE.`)
      cliente.codigo_verificacion = codigo;
      cliente.validado = false;
    }
  }

  Cliente.addHook('beforeCreate', setSaltAndPassword);
  Cliente.addHook('beforeUpdate', setSaltAndPassword);
  return Cliente;
};