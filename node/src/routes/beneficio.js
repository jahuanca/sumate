'use strict'
const express=require('express')
const router=express.Router()
const beneficio=require('../controllers/beneficio')
const auth=require('../middlewares/auth')
const multer  = require('multer')
const path=require('path')
const crypto=require('crypto')

/*const storage=multer.diskStorage({
    destination: './public/uploads/beneficios/',
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
 * /Beneficio/:
 *  get:
 *    tags: [Beneficio]
 *    description: Obtiene todos los Beneficios.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',beneficio.getBeneficios)
router.get('/id/:id',beneficio.getBeneficio)
router.post('/create', auth.isAuthAdmin ,beneficio.createBeneficio)
router.put('/update', auth.isAuthAdmin ,beneficio.updateBeneficio)
router.delete('/delete/:id', auth.isAuthAdmin , beneficio.deleteBeneficio)

module.exports=router
/** 
* @swagger
*definitions:
*  Beneficio:           
*    type: object
*    required:
*      - cod_Beneficio
*    properties:
*      cod_Beneficio:
*        type: integer
*/