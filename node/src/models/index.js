'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { isNumber } = require('lodash');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
module.exports.limpiar=limpiar;

  function limpiar(value){
    if(value==undefined || value==0 || value==null || value==='undefined'){
        return null;
    }
    if(isNumber(value)){
      return value;
    }
    value=value.replace(/-/g,"");
    if(value.trim()=='' || value.trim()=='null'){
        return null;
    }else{
        return value.trim()
    }
}

