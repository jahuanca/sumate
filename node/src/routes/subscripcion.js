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
router.get('/id_usuario_invito/:id',subscripcion.getSubscripcionsInvito)
router.get('/activos_invito/:id',subscripcion.getSubscripcionsInvitoActivos)
router.get('/atender_invito/:id',subscripcion.getSubscripcionsInvitoAtender)
router.post('/create', auth.isAuthUser, multer({storage: storage}).single('files'), subscripcion.createSubscripcion)
router.post('/createAdmin', auth.isAuthAdmin, multer({storage: storage}).single('files'),subscripcion.createAdminSubscripcion)
router.post('/atender', auth.isAuthAdmin,subscripcion.atenderSubscripcion)
router.post('/atenderPropia', auth.isAuthUser ,subscripcion.atenderSubscripcionPropia)
router.put('/update', auth.isAuthAdmin,  multer({storage: storage}).single('files') ,subscripcion.updateSubscripcion)
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