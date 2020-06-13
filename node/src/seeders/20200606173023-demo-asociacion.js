'use strict';
const models=require('../models')
const Chance=require('chance')
const config=require('../config')
const chance=new Chance();

module.exports = {
  up: (queryInterface, Sequelize) => {
    let elementos=[];
    for (let index = 0; index < config.sizeComercios; index++) {
      elementos.push(
        {
          id_comercio: chance.integer({min:1, max: config.sizeComercios}),
          id_delivery: chance.integer({min:1, max: config.sizeDeliverys}),
          descripcion:  chance.sentence({ words: 5 }),
          observacion:  chance.sentence({ words: 5 })
        }
      )
    }
    return models.Asociacion.bulkCreate(elementos, {
      individualHooks: true 
    }, {returning: true})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Asociacion', null, {});
  }
};
