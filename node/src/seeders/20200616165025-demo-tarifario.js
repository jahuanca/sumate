'use strict';
const models=require('../models')
const Chance=require('chance')
const config=require('../config')
const chance=new Chance();

module.exports = {
  up: (queryInterface, Sequelize) => {
    let elementos=[];
    for (let j = 0; j < config.sizeComercios*config.sizeDeliverys; j++) {
      for (let index = 0; index < config.sizeZonas*config.sizeDeliverys; index++) {
        elementos.push(
          {
            id_asociacion: j+1,
            //id_zona_destino: chance.integer({min: 1, max: config.sizeZonas}),
            id_zona_destino: index+1,
            precio: chance.integer({min: 2, max: 30}),
            tiempo: chance.integer({min: 10, max: 35}),
            descripcion:  chance.sentence({words: 5}),
            condicion:  chance.sentence({words: 5}),
            restriccion:  chance.sentence({words: 5}),
            observacion: chance.sentence({words: 5})
          }
        )
      }
    }
    
    return models.Tarifario.bulkCreate(elementos, {
      individualHooks: true 
    }, {returning: true})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tarifario', null, {});
  }
};
