'use strict'
const express=require('express')
const router=express.Router()
const pedido=require('../controllers/pedido')
const auth=require('../middlewares/auth')
const multer  = require('multer')
const path=require('path')
const crypto=require('crypto')

const storage=multer.diskStorage({
    destination: './public/uploads/pedidos/',
    filename: function(req, file, cb) {
      return crypto.pseudoRandomBytes(16, function(err, raw) {
        if (err) {
          return cb(err);
        }
        return cb(null, "sum2020_" + (raw.toString('hex')) + (path.extname(file.originalname)));
      });
    }
});

/**
 * @swagger
 * /Pedido/:
 *  get:
 *    tags: [Pedido]
 *    description: Obtiene todos los Pedidos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',pedido.getPedidos)
router.get('/id/:id',pedido.getPedido)
router.get('/id_cliente/:id',pedido.getPedidosCliente)
router.get('/misPedidos', auth.isAuthCliente,pedido.getMisPedidos)
router.post('/cambiarEstadoPedido',pedido.cambiarEstadoPedido)
router.post('/pedidosAtendiendo',pedido.getPedidosAtendiendo)
router.post('/create',pedido.createPedido)
router.post('/createAllPedido',auth.isAuthCliente ,pedido.createAllPedido)
//router.put('/updateAllPedido', multer({storage: storage}).array('files',5) ,pedido.updateAllPedido)
router.put('/update', pedido.updatePedido)
router.delete('/delete/:id', pedido.deletePedido)

module.exports=router
/** 
* @swagger
*definitions:
*  Pedido:           
*    type: object
*    required:
*      - cod_Pedido
*    properties:
*      cod_Pedido:
*        type: integer
*      nombre_Pedido:
*        type: string
*      clave_Pedido:
*        type: string
*      esta_logueado:
*        type: boolean
*      fecha_registro:
*        type: date
*      responsable:
*        type: string
*      observaciones:
*        type: string
*      estado:
*        type: string
*      cambio_clave:
*        type: integer
*/