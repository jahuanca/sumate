'use strict';
const models=require('../models')
const Chance=require('chance')
const config=require('../config')
const chance=new Chance();

module.exports = {
  up: (queryInterface, Sequelize) => {
    let elementos=[];
    for (let index = 0; index < config.sizeClientes*10; index++) {
      elementos.push(
        {
          id_cliente: chance.integer({min: 1, max: config.sizeClientes}),
          id_tarifario: chance.integer({min: 1, max: config.sizeClientes*10}),
          id_tipo_envio: chance.integer({min: 1, max: 2}),
          id_forma_pago: chance.integer({min: 1, max: 3}),
          id_estado_pedido: chance.integer({min: 1, max: 7}),
          direccion: chance.street(),
          referencia: chance.sentence({words: 7}),
          latitud: chance.latitude({min: -5.3, max: -5.1}),
          longitud: chance.longitude({min: -80.7, max: -80.5}),
          peso: chance.integer({min: 1, max: 300}),
          tarifa: chance.integer({min: 1, max: 7}),
          total: chance.integer({min: 100, max: 157}),
          observacion: chance.sentence({words: 5})
        }
      )
    }
    return models.Pedido.bulkCreate(elementos, {
      individualHooks: true 
    }, {returning: true})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Pedido', null, {});
  }
};
