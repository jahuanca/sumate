'use strict'


module.exports={
    port: process.env.PORT || 3000,
    db: process.env.SQLSERVER || '',
    SECRET_TOKEN: '20200327congresos',
    sizePersonas: 100,
    sizeDirectiva: 100/20,
    sizePonente: 100/20,
    sizeComision: 100/20,
    sizeAsistente:100 - 100/20 - 100/20 - 100/20
}