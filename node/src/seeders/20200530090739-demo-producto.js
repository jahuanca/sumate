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
          id_categoria: chance.integer({min: 1, max: config.sizeDeliverys}),
          id_comercio: chance.integer({min: 1, max: config.sizeComercios}),
          nombre: chance.name(),
          presentacion: chance.country(),
          cantidad: chance.integer({min: 70, max: 80}),
          peso: chance.integer({min: 1000, max: 3000}),
          precio: chance.integer({min: 1, max: 30}),
          tiempo_preparacion: chance.integer({min: 0, max: 30})
        }
      )
    }
    return models.Producto.bulkCreate(elementos, {returning: true})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Producto', null, {});
  }
};
