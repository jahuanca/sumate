'use strict';
const models=require('../models')
const Chance=require('chance')
const config=require('../config')
const chance=new Chance();

module.exports = {
  up: (queryInterface, Sequelize) => {
    let elementos=[];
    for (let index = 0; index < config.sizeClientes; index++) {
      elementos.push(
        {
          id_usuario: index+1+config.sizeComercios+config.sizeDeliverys,
          dni:  chance.string({ length: 8, numeric: true }),
          nombre: chance.name(),
          apellido:  chance.last(),
          direccion: chance.address(),
          celular:  chance.string({ length: 9, numeric: true }),
          descripcion:  chance.sentence({words: 5}),
          observacion: chance.sentence({words: 5})
        }
      )
    }
    return models.Cliente.bulkCreate(elementos, {
      individualHooks: true 
    }, {returning: true})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Cliente', null, {});
  }
};
