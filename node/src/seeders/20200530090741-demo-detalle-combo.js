'use strict';
const models=require('../models')
const Chance=require('chance')
const config=require('../config')
const chance=new Chance();

module.exports = {
  up: (queryInterface, Sequelize) => {
    let elementos=[];
    for (let index = 0; index < config.sizeProductos*3; index++) {
      elementos.push(
        {
          id_combo: chance.integer({min: 1, max: config.sizeProductos}),
          id_producto: chance.integer({min: 1, max: config.sizeProductos}),
          cantidad: chance.integer({min: 1, max: 3}),
          observacion: chance.sentence({words: 5})
        }
      )
    }
    return models.Detalle_Combo.bulkCreate(elementos, {
      individualHooks: true 
    }, {returning: true})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Detalle_Combo', null, {});
  }
};
