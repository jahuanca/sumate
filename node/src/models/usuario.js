'use strict';
const crypto=require('crypto')

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    id_tipo_usuario: {type: DataTypes.INTEGER, allowNull: false, validate: {min: 1, isInt: true}},
    codigo_invitado: {type: DataTypes.STRING, allowNull: true, unique: true, validate: {len: [1,200], notEmpty: true}
    },
    username: {type: DataTypes.STRING(50), unique: true, allowNull: false, validate: {isEmail: true,notEmpty: true, len: [1,50]}},
    password: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]},
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
    cash: {type: DataTypes.INTEGER, allowNull: true, defaultValue: 0},
    deliverys_gratis: {type: DataTypes.INTEGER, allowNull: true, defaultValue: 0},
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
  }, {
    freezeTableName: true,
    tableName: 'Usuario'
  });
  Usuario.associate = function(models) {
    Usuario.hasMany(models.Subscripcion, {foreignKey: 'id_usuario'});
    Usuario.hasMany(models.Subscripcion, {foreignKey: 'id_usuario_invito', as: 'Invitaciones'});
    Usuario.belongsTo(models.Tipo_Usuario, {foreignKey: 'id_tipo_usuario'});
    Usuario.hasOne(models.Administrador, {foreignKey: 'id_usuario'});
    Usuario.hasOne(models.Cliente, {foreignKey: 'id_usuario'});
    Usuario.hasOne(models.Comercio, {foreignKey: 'id_usuario'});
    Usuario.hasOne(models.Delivery, {foreignKey: 'id_usuario'});
    Usuario.hasOne(models.Trabajador, {foreignKey: 'id_usuario'});
  };

  Usuario.generateSalt = function() {
    return crypto.randomBytes(16).toString('base64')
  }

  Usuario.generateCodigo = function() {
    return crypto.randomBytes(16).toString('base64').substring(0,10);
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

  Usuario.prototype.correctCodigo = function(codigo) {
    return codigo === this.codigo_verificacion();
  }

  const setSaltAndPassword = (usuario,options) => {
    if (usuario.changed('username')) {
      usuario.codigo_verificacion = Usuario.generateCodigo()
      usuario.validado = false;
    }
    if (usuario.changed('password')) {
        usuario.salt = Usuario.generateSalt()
        usuario.password = Usuario.encryptPassword(usuario.password(), usuario.salt())
    }
  }



  Usuario.addHook('beforeCreate', setSaltAndPassword);
  Usuario.addHook('afterCreate', async (usuario, options) => {
    await Usuario.update({ codigo_invitado: `SUM-00${usuario.dataValues.id}` }, {
      where: {
        id: usuario.id
      },
      transaction: options.transaction
    });
    //usuario.codigo_invitado=`SUM-00${usuario.dataValues.id}`;
    // return usuario.set('codigo_invitado', `SUM-00${usuario.dataValues.id}`).save().then((self) => {
    //   return self;
    // });
  });
  Usuario.addHook('beforeUpdate', setSaltAndPassword);
  return Usuario;
};