'use strict';
const moment=require('moment');

module.exports = (sequelize, DataTypes) => {
  const Subscripcion = sequelize.define('Subscripcion', {
    
    //TODO:crear enrutado guards

    id_usuario: {type: DataTypes.INTEGER, allowNull: false, validate: {min: 1, isInt: true}},
    id_usuario_invito: {type: DataTypes.INTEGER, allowNull: true, validate: {min: 1, isInt: true}},
    id_plan: {type: DataTypes.INTEGER, allowNull: true, validate: {min: 1, isInt: true}},
    monto: {type: DataTypes.DOUBLE, allowNull: true, validate: {min: 0, isDecimal: true}},
    nota: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    
    atendido: {type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false},
    inicio: {type: DataTypes.DATE, allowNull: true},
    fin: {type: DataTypes.DATE, allowNull: true},

    imagenes: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},

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
    validate:{
      unicoActivo() {
        console.log('id '+this.id_usuario)
        if (true) {
          throw new Error('Either both latitude and longitude, or neither!');
        }
        
      },
      /* function(done){
        console.log('id '+this.id_usuario)
        sequelize.models.Subscripcion.findOne({
          where: {estado: 'A', atendido: true, id_usuario: this.id_usuario}
        })
        .done(function (subscripcion, err) {
          if (err) {
              done(err);
          }
          if (subscripcion) {
              if(moment().isBefore(subscripcion.fin)){
                done(new Error('Ya tiene una subscripcion activa.'));
              }
          }
          done();
        });
      } */
    },
    freezeTableName: true,
    tableName: 'Subscripcion'
  });
  Subscripcion.associate = function(models) {
    Subscripcion.belongsTo(models.Usuario, {foreignKey: 'id_usuario', as: 'Usuario'});
    Subscripcion.belongsTo(models.Usuario, {foreignKey: 'id_usuario_invito', as: 'UsuarioInvito'});
  };

  const validar={
    validate:{
      isUnique: function(done){
          //cuando se va modificar y crear id_cartera!=undefined
        sequelize.models.Subscripcion.findOne({
          where: {estado: 'A', atendido: true, id_usuario: this.id_usuario}
        })
        .done(function (subscripcion, err) {
          if (err) {
              done(err);
          }
          if (subscripcion) {
              if(moment().isBefore(subscripcion.fin)){
                done(new Error('Ya tiene una subscripcion activa.'));
              }
          }
          done();
        });
      }
  }};


  //FIXME: invalid date in null parameter
  //TODO: crear y probar metodo de atender
  //asimismo inicio y fin
  const updateInUserPremium = async (subscripcion,options) => {
    console.log('entro')
    if(subscripcion.changed('atendido')){
      if(subscripcion.atendido=='A'){
        console.log('atendido')
        let [err,plan]=await get(sequelize.models.Plan.findOne({estado: 'A', id: subscripcion.id_plan}));
        if(err || plan==null) return;
        subscripcion.inicio= moment();
        subscripcion.fin=moment().add(plan.duracion,'d');
      }
    }
  }
  

  Subscripcion.addHook('beforeCreate', updateInUserPremium);
  Subscripcion.addHook('beforeUpdate', updateInUserPremium);  
  
  return Subscripcion;

};

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

