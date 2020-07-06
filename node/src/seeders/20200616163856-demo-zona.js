'use strict';
const models=require('../models')
const Chance=require('chance')
const config=require('../config')
const chance=new Chance();

module.exports = {
  up: (queryInterface, Sequelize) => {
    let elementos=[];
    for (let index = 0; index < config.sizeZonas; index++) {
      let p=[];
      let latitud=chance.latitude({min: -5.3, max: -5.1});
      let longitud=chance.longitude({min: -80.7, max: -80.5})
      p.push({lat: latitud, lng: longitud})
      p.push({lat: latitud+0.01, lng: longitud})
      p.push({lat: latitud+0.01, lng: longitud+0.01})
      p.push({lat: latitud, lng: longitud+0.01})
      elementos.push(
        {
          id_distrito: chance.integer({min: 1, max: 10}),
          nombre: chance.street(),
          descripcion:  chance.sentence({words: 5}),
          observacion: chance.sentence({words: 5}),
          puntos: JSON.stringify(p)
        }
      )
    }
    return models.Zona.bulkCreate(elementos, {
      individualHooks: true 
    }, {returning: true})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Zona', null, {});
  }
};
