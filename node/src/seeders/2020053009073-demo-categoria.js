'use strict';
const models=require('../models')
const Chance=require('chance')
const config=require('../config')
const chance=new Chance();

module.exports = {
  up: (queryInterface, Sequelize) => {
    let elementos=[];
    for (let index = 0; index < config.sizeDeliverys; index++) {
      elementos.push(
        {
          nombre: chance.name(),
          descripcion:  chance.sentence({words: 5}),
          observacion: chance.sentence({words: 5})
        }
      )
    }
    return models.Categoria.bulkCreate(elementos, {
      individualHooks: true 
    }, {returning: true})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categoria', null, {});
  }
};
