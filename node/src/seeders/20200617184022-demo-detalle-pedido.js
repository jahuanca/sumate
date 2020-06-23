'use strict';
const models=require('../models')
const Chance=require('chance')
const config=require('../config')
const chance=new Chance();

module.exports = {
  up: (queryInterface, Sequelize) => {
    let elementos=[];
    for (let index = 0; index < config.sizeClientes*20; index++) {
      elementos.push(
        {
          id_pedido: chance.integer({min: 1, max: config.sizeClientes*10}),
          id_producto: chance.integer({min: 1, max: config.sizeProductos}),
          cantidad: chance.integer({min: 2, max: 30}),
          precio: chance.integer({min: 2, max: 30}),
          peso: chance.integer({min: 10, max: 35}),
          subtotal: chance.integer({min: 10, max: 35}),
          observacion: chance.sentence({words: 5})
        }
      )
    }
    return models.Detalle_Pedido.bulkCreate(elementos, {
      individualHooks: true 
    }, {returning: true})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Detalle_Pedido', null, {});
  }
};
