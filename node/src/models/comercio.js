'use strict';
const crypto=require('crypto')
const nexmo=require('../services/nexmo')
module.exports = (sequelize, DataTypes) => {
  const Comercio = sequelize.define('Comercio', {
    id_usuario: {type: DataTypes.INTEGER, allowNull: false, validate: {min: 1, isInt: true}},
    id_tipo_comercio: {type: DataTypes.INTEGER, allowNull: false, validate: {isInt: true, min: 1}},
    ruc: {type: DataTypes.STRING(11), allowNull: false, validate: {notEmpty: true, len: [11,11]}},
    nombre: {type: DataTypes.STRING(100), allowNull: false, validate: {notEmpty: true, len: [1,100]}},
    razon_social: {type: DataTypes.STRING(100), allowNull: false, validate: {notEmpty: true, len: [1,100]}},
    direccion: {type: DataTypes.STRING(100), allowNull: false, validate: {notEmpty: true, len: [1,100]}},
    latitud:{type: DataTypes.DOUBLE, allowNull:false, validate: {isNumeric: true}},
    longitud:{type: DataTypes.DOUBLE, allowNull:false, validate: {isNumeric: true}},
    celular: {type: DataTypes.STRING(9), allowNull: false, validate: {notEmpty: true, len: [9,9]}},
    
    facebook: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [0,200]}},
    instagram: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [0,200]}},
    whatsapp: {type: DataTypes.STRING(20), allowNull: true, validate: {notEmpty: true, len: [0,20]}},

    validado: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    codigo_verificacion:{type: DataTypes.STRING(10), allowNull: true, 
      get() {
        return() => this.getDataValue('codigo_verificacion')
      }
    },
    hora_apertura: {type: DataTypes.DATE, allowNull: false},
    hora_cierre: {type: DataTypes.DATE, allowNull: false},
    valoracion: {type: DataTypes.DOUBLE, allowNull: true, validate: {isDecimal: true}, defaultValue: 0},
    imagenes: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    descripcion: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
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
    tableName: 'Comercio'
  });
  Comercio.associate = function(models) {
    Comercio.belongsTo(models.Tipo_Comercio, {foreignKey: 'id_tipo_comercio'})
    Comercio.belongsTo(models.Usuario, {foreignKey: 'id_usuario'})
    Comercio.hasMany(models.Forma_Pago_Comercio, {foreignKey: 'id_comercio'});
  };
  Comercio.generateCodigo = function() {
    return crypto.randomBytes(16).toString('base64').substring(0,10);
  }

  Comercio.encryptPassword = function(plainText, salt) {
      return crypto
          .createHash('RSA-SHA256')
          .update(plainText)
          .update(salt)
          .digest('hex')
  }


  Comercio.prototype.correctCodigo = function(codigo) {
    return codigo === this.codigo_verificacion();
  }

  const setSaltAndPassword = (comercio,options) => {
    if (comercio.changed('celular')) {
      let codigo=Comercio.generateCodigo();
      nexmo.sendMessage('','51'+comercio.celular,`Su código de verificación es ${codigo}. SUMATE.`)
      comercio.codigo_verificacion = codigo;
      comercio.validado = false;
    }
  }

  Comercio.addHook('beforeCreate', setSaltAndPassword);
  Comercio.addHook('beforeUpdate', setSaltAndPassword);

  const crearFormasPago = async (comercio,options) => {
    let [err,forma]=await get(sequelize.models.Forma_Pago.findAll({where: {estado: 'A'}}));    
    if(err) console.log(err);
    for (let i = 0; i < forma.length; i++) {

      let [err2, forma_pago_comercio]=await get(sequelize.models.Forma_Pago_Comercio.create(
        { 
          id_forma_pago: forma[i].id,
          id_comercio: comercio.id,
          cuenta: '-SU CUENTA-'
        }, {transaction: options.transaction}));
      if(err2) console.log(err2);
    }
    
  }
  
  Comercio.addHook('afterCreate', crearFormasPago);

  return Comercio;
};

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}