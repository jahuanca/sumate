'use strict'
const express=require('express')
const router=express.Router()
const subscripcion=require('../controllers/subscripcion')
const auth=require('../middlewares/auth')
const multer  = require('multer')
const path=require('path')
const crypto=require('crypto')

const storage=multer.diskStorage({
    destination: './public/uploads/subscripcions/',
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
 * /Subscripcion/:
 *  get:
 *    tags: [Subscripcion]
 *    description: Obtiene todos los Subscripcions.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',subscripcion.getSubscripcions)
router.get('/id/:id',subscripcion.getSubscripcion)
router.post('/create', auth.isAuthUser, multer({storage: storage}).single('files'),subscripcion.createSubscripcion)
router.put('/update',subscripcion.updateSubscripcion)
router.delete('/delete/:id', subscripcion.deleteSubscripcion)

module.exports=router
/** 
* @swagger
*definitions:
*  Subscripcion:           
*    type: object
*    required:
*      - cod_Subscripcion
*    properties:
*      cod_Subscripcion:
*        type: integer
*/