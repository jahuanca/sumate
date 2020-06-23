'use strict'


module.exports={
    port: process.env.PORT || 3000,
    db: process.env.SQLSERVER || '',
    SECRET_TOKEN: '20200327congresos',
    sizeDeliverys: 10,
    sizeComercios: 10,
    sizeClientes: 100,
    sizeProductos: 1000
}