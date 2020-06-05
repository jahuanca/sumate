'use strict';
const models=require('../models')
const Chance=require('chance')
const config=require('../config')
const chance=new Chance();

module.exports = {
  up: (queryInterface, Sequelize) => {
    let elementos=[];
    for (let index = 0; index < config.sizeClientes+config.sizeClientes+config.sizeComercios; index++) {
      elementos.push(
        {
          id_tipo_usuario: chance.integer({min:1, max: 5}),
          username: 'u'+index+'@gmail.com',
          password:  '1234',
          observacion: 'Ingresado por defecto',
        }
      )
    }
    return models.Usuario.bulkCreate(elementos, {
      individualHooks: true 
    }, {returning: true})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Usuario', null, {});
  }
};
