'use strict'
const express=require('express')
const router=express.Router()
const combo=require('../controllers/combo')
const auth=require('../middlewares/auth')
const multer  = require('multer')
const path=require('path')
const crypto=require('crypto')

const storage=multer.diskStorage({
    destination: './public/uploads/combos/',
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
 * /Combo/:
 *  get:
 *    tags: [Combo]
 *    description: Obtiene todos los Combos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',combo.getCombos)
router.get('/misCombos', auth.isAuthOnlyComercio,combo.getMisCombos)
router.get('/id/:id',combo.getCombo)
router.get('/id_cliente/:id',combo.getCombosCliente)
router.get('/id_comercio/:id',combo.getCombosComercio)
router.get('/misCombos', auth.isAuthCliente,combo.getMisCombos)
router.post('/cambiarEstadoCombo',combo.cambiarEstadoCombo)
router.post('/combosAtendiendo',combo.getCombosAtendiendo)
router.post('/create',combo.createCombo)
router.post('/createAllCombo', auth.isAuthOnlyComercio ,multer({storage: storage}).array('files',5) ,combo.createAllCombo)
//router.put('/updateAllCombo', multer({storage: storage}).array('files',5) ,combo.updateAllCombo)
router.put('/update', auth.isAuthOnlyComercio, multer({storage: storage}).array('files',5) ,combo.updateCombo)
router.delete('/delete/:id', combo.deleteCombo)

module.exports=router
/** 
* @swagger
*definitions:
*  Combo:           
*    type: object
*    required:
*      - cod_Combo
*    properties:
*      cod_Combo:
*        type: integer
*      nombre_Combo:
*        type: string
*      clave_Combo:
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