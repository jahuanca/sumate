'use strict';
const models=require('../models')
const Chance=require('chance')
const config=require('../config')
const chance=new Chance();

module.exports = {
  up: (queryInterface, Sequelize) => {
    let elementos=[];
    for (let index = 0; index < config.sizeDeliverys ; index++) {
      elementos.push(
        {
          id_usuario: index+1+config.sizeComercios,
          ruc:  chance.string({ length: 11, numeric: true }),
          nombre: chance.name(),
          razon_social: chance.name({ middle: true }),
          direccion: chance.address(),
          latitud: chance.latitude({min: -5.3, max: -5.1}),
          longitud: chance.longitude({min: -80.7, max: -80.5}),
          celular:  chance.string({ length: 8, numeric: true }),
          validado: false,
          hora_apertura: new Date(),
          hora_cierre: new Date(),
          condicion:  chance.sentence({ words: 5 }),
          restriccion:  chance.sentence({ words: 5 }),
          descripcion:  chance.sentence({ words: 5 }),
          observacion:  chance.sentence({ words: 5 })
        }
      )
    }
    return models.Delivery.bulkCreate(elementos, {returning: true})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Delivery', null, {});
  }
};
