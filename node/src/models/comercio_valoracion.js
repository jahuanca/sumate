'use strict';
module.exports = (sequelize, DataTypes) => {
  const ComercioValoracion = sequelize.define('Comercio_Valoracion', {
    
    id_usuario: {type: DataTypes.INTEGER, allowNull: false, validate: {min: 1, isInt: true}},
    id_comercio: {type: DataTypes.INTEGER, allowNull: false, validate: {min: 1, isInt: true}},
    valoracion: {type: DataTypes.INTEGER, allowNull: false, validate: {min: 1, isInt: true}},
    comentario: {type: DataTypes.STRING, allowNull: true},

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
            //cuando se va modificar y crear id_cartera!=undefined
          sequelize.models.ComercioValoracion.count({
            where: {estado: 'A', id_usuario: this.id_usuario, id_comercio: this.id_comercio}
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
    },
    freezeTableName: true,
    tableName: 'Comercio_Valoracion'
  });
  ComercioValoracion.associate = function(models) {
    // associations can be defined here
  };


  const calcularValoracionComercio=async (comercioValoracion, options) => {
    let [err,promedio]=await get(sequelize.models.Comercio_Valoracion.findAll({
      attributes: ['id_comercio',[sequelize.fn('AVG', sequelize.col('valoracion')), 'valoracion']],
      group: 'id_comercio',
      where: {
        id_comercio: comercioValoracion.id_comercio, estado: 'A'
      },
      transaction: options.transaction
    }));
    if(err) return;

    await sequelize.models.Comercio.update({ valoracion: promedio[0].valoracion }, {
      where: {
        id: comercioValoracion.id_comercio, estado: 'A'
      },
      transaction: options.transaction
    });
  }

  ComercioValoracion.addHook('afterCreate', calcularValoracionComercio);
  ComercioValoracion.addHook('afterUpdate', calcularValoracionComercio);


  return ComercioValoracion;
};

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}