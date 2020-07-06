'use strict';
const models=require('../models')
const Chance=require('chance')
const config=require('../config')
const chance=new Chance();

module.exports = {
  up: (queryInterface, Sequelize) => {
    let elementos=[];
    for (let j = 0; j < config.sizeDeliverys; j++) {
      for (let index = 0; index < config.sizeComercios; index++) {
        elementos.push(
          {
            id_comercio: index+1,
            id_delivery: j+1,
            descripcion:  chance.sentence({ words: 5 }),
            observacion:  chance.sentence({ words: 5 })
          }
        )
      } 
    }
    return models.Asociacion.bulkCreate(elementos, {
      individualHooks: true 
    }, {returning: true})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Asociacion', null, {});
  }
};
