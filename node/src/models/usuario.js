'use strict';
const crypto=require('crypto')
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    id_tipo_usuario: {type: DataTypes.INTEGER, allowNull: false, validate: {min: 1, isInt: true}},
    username: {type: DataTypes.STRING(50), unique: true, allowNull: false, validate: {isEmail: true,notEmpty: true, len: [1,50]}},
    password: {type: DataTypes.STRING(200), allowNull: false, validate: {notEmpty: true, len: [1,200]},
      get() {
        return () => this.getDataValue('password')
      }
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 0,
      get() {
          return() => this.getDataValue('salt')
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
  }, {
    freezeTableName: true,
    tableName: 'Usuario'
  });
  Usuario.associate = function(models) {
    Usuario.belongsTo(models.Tipo_Usuario, {foreignKey: 'id_tipo_usuario'});
  };
  Usuario.generateSalt = function() {
    return crypto.randomBytes(16).toString('base64')
  }
  Usuario.encryptPassword = function(plainText, salt) {
      return crypto
          .createHash('RSA-SHA256')
          .update(plainText)
          .update(salt)
          .digest('hex')
  }

  Usuario.prototype.correctPassword = function(enteredPassword) {
    return Usuario.encryptPassword(enteredPassword, this.salt()) === this.password()
  }

  const setSaltAndPassword = (usuario,options) => {
    if (usuario.changed('password')) {
        usuario.salt = Usuario.generateSalt()
        usuario.password = Usuario.encryptPassword(usuario.password(), usuario.salt())
    }
  }

  Usuario.addHook('beforeCreate', setSaltAndPassword);
  Usuario.addHook('beforeUpdate', setSaltAndPassword);
  return Usuario;
};