'use strict';
module.exports = (sequelize, DataTypes) => {
  const Subscripcion = sequelize.define('Subscripcion', {
    
    //TODO: crear apartado en admin Subscripcion, metodo especial de atender subscripcion
    //TODO:crear enrutado guards

    id_usuario: {type: DataTypes.INTEGER, allowNull: false, validate: {min: 1, isInt: true}},
    id_usuario_invito: {type: DataTypes.INTEGER, allowNull: true, validate: {min: 1, isInt: true}},
    monto: {type: DataTypes.DOUBLE, allowNull: true, validate: {min: 0, isDecimal: true}},
    nota: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    
    atendido: {type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false},
    dias_agregar: {type: DataTypes.INTEGER, allowNull: true},
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
    //validar,
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
        sequelize.models.Subscripcion.count({
          where: {estado: 'A', id_usuario: this.id_usuario}
        })
        .done(function (cantidad, err) {
          if (err) {
              done(err);
          }
          if (cantidad>0) {
              done(new Error('Ya se creo una subscripcion.'));
          }
          done();
        });
      }
    }};
  
  return Subscripcion;

};