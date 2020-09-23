'use strict';
const moment=require('moment');

module.exports = (sequelize, DataTypes) => {
  const Subscripcion = sequelize.define('Subscripcion', {
    
    //TODO:crear enrutado guards
    //TODO: crear en vista usuario cash y deliverys
    //TODO: crear en detalle de pedido campo de cash para especificar si se pago con cash de cuanto fue
    //TODO: en mi cuenta crear un item mas con informacion de la cuenta para agrear si es premium cuanto de cash y deliverys gratis
    //TODO: considerar agregar icono en beneficio
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
      isUnique: function(done){
          //enviar valores en el metodo a validar 
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
    },
    freezeTableName: true,
    tableName: 'Subscripcion'
  });
  Subscripcion.associate = function(models) {
    Subscripcion.belongsTo(models.Usuario, {foreignKey: 'id_usuario', as: 'Usuario'});
    Subscripcion.belongsTo(models.Usuario, {foreignKey: 'id_usuario_invito', as: 'UsuarioInvito'});
    Subscripcion.belongsTo(models.Plan, {foreignKey: 'id_plan'});
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


  const updateInUserPremium = async (subscripcion,options) => {
    if(subscripcion.changed('atendido')){
      if(subscripcion.atendido){
        let [err,plan]=await get(sequelize.models.Plan.findOne({where :{estado: 'A', id: subscripcion.id_plan}}));
        if(err || plan==null) return new Error('No se encontro el plan deseado');
        subscripcion.inicio= moment();
        subscripcion.fin=moment().add(plan.duracion,'d');
        let [err2,usuario]=await get(sequelize.models.Usuario.increment({
          'cash': plan.cash,
          'deliverys_gratis': plan.deliverys_gratis
        },{
          where: {id: subscripcion.id_usuario, estado: 'A'}
        }));
        if(err2 || usuario==null) return new Error('Ocurrio un error al agregar beneficios al usuario');
      }
    }

    if(subscripcion.changed('estado')){
      if(subscripcion.estado=='I' && subscripcion.atendido){
        let [err,plan]=await get(sequelize.models.Plan.findOne({where :{estado: 'A', id: subscripcion.id_plan}}));
        if(err || plan==null) return new Error('No se encontro el plan deseado');
        let [err2,usuario]=await get(sequelize.models.Usuario.decrement({
          'cash': plan.cash,
          'deliverys_gratis': plan.deliverys_gratis
        },{
          where: {id: subscripcion.id_usuario, estado: 'A'}
        }));
        if(err2 || usuario==null) return new Error('Ocurrio un error al agregar beneficios al usuario');
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

