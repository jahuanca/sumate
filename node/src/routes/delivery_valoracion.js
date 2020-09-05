'use strict'
const express=require('express')
const router=express.Router()
const delivery_valoracion=require('../controllers/delivery_valoracion')
const auth=require('../middlewares/auth')
const multer  = require('multer')
const path=require('path')
const crypto=require('crypto')

/*const storage=multer.diskStorage({
    destination: './public/uploads/delivery_valoracions/',
    filename: function(req, file, cb) {
      return crypto.pseudoRandomBytes(16, function(err, raw) {
        if (err) {
          return cb(err);
        }
        return cb(null, "sum2020_" + (raw.toString('hex')) + (path.extname(file.originalname)));
      });
    }
});*/

/**
 * @swagger
 * /Delivery_Valoracion/:
 *  get:
 *    tags: [Delivery_Valoracion]
 *    description: Obtiene todos los Delivery_Valoracions.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',delivery_valoracion.getDelivery_Valoracions)
router.get('/id/:id',delivery_valoracion.getDelivery_Valoracion)
router.post('/create',delivery_valoracion.createDelivery_Valoracion)
router.put('/update',delivery_valoracion.updateDelivery_Valoracion)
router.delete('/delete/:id', delivery_valoracion.deleteDelivery_Valoracion)

module.exports=router
/** 
* @swagger
*definitions:
*  Delivery_Valoracion:           
*    type: object
*    required:
*      - cod_Delivery_Valoracion
*    properties:
*      cod_Delivery_Valoracion:
*        type: integer
*/