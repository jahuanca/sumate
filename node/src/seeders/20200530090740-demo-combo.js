'use strict';
const models=require('../models')
const Chance=require('chance')
const config=require('../config')
const chance=new Chance();

module.exports = {
  up: (queryInterface, Sequelize) => {
    let elementos=[];
    for (let index = 0; index < config.sizeProductos; index++) {
      elementos.push(
        {
          nombre: chance.name(),
          peso: chance.integer({min: 1, max: 3}),
          precio: chance.integer({min: 1, max: 7}),
          descripcion: chance.sentence({words: 5}),
          observacion: chance.sentence({words: 5}),
          createdAt: chance.date({day: chance.integer({min:1, max: 5})})
        }
      )
    }
    return models.Combo.bulkCreate(elementos, {
      individualHooks: true 
    }, {returning: true})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Combo', null, {});
  }
};
