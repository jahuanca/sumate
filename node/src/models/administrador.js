'use strict';
module.exports = (sequelize, DataTypes) => {
  const Administrador = sequelize.define('Administrador', {
    id_usuario: {type: DataTypes.INTEGER, allowNull: false, validate: {min: 1, isInt: true}},
    dni: {type: DataTypes.CHAR(8), unique: true, allowNull: true, validate: {notEmpty: true, len: [8,8], isNumeric: true}},
    nombre: {type: DataTypes.STRING(50), allowNull: false, validate: {notEmpty: true, len: [1,50]}},
    apellido: {type: DataTypes.STRING(50), allowNull: false, validate: {notEmpty: true, len: [1,50]}},
    direccion: {type: DataTypes.STRING(150), allowNull: true, validate: {notEmpty: true, len: [1,50]}},
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
    tableName: 'Administrador'
  });
  Administrador.associate = function(models) {
    Administrador.belongsTo(models.Usuario, {foreignKey: 'id_usuario'});
  };

  Administrador.generateCodigo = function() {
    return crypto.randomBytes(16).toString('base64').substring(0,10);
  }

  Administrador.encryptPassword = function(plainText, salt) {
      return crypto
          .createHash('RSA-SHA256')
          .update(plainText)
          .update(salt)
          .digest('hex')
  }


  Administrador.prototype.correctCodigo = function(codigo) {
    return codigo === this.codigo_verificacion();
  }

  const setSaltAndPassword = (administrador,options) => {
    if (administrador.changed('celular')) {
      let codigo=Administrador.generateCodigo();
      nexmo.sendMessage('','51'+administrador.celular,`Su código de verificación es ${codigo}. SUMATE.`)
      administrador.codigo_verificacion = codigo;
      administrador.validado = false;
    }
  }

  //Administrador.addHook('beforeCreate', setSaltAndPassword);
  Administrador.addHook('beforeUpdate', setSaltAndPassword);
  return Administrador;
};