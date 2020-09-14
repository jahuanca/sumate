'use strict'
const express=require('express')
const router=express.Router()
const beneficio_plan=require('../controllers/beneficio_plan')
const auth=require('../middlewares/auth')
const multer  = require('multer')
const path=require('path')
const crypto=require('crypto')

/*const storage=multer.diskStorage({
    destination: './public/uploads/beneficio_plans/',
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
 * /Beneficio_Plan/:
 *  get:
 *    tags: [Beneficio_Plan]
 *    description: Obtiene todos los Beneficio_Plans.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',beneficio_plan.getBeneficio_Plans)
router.get('/id/:id',beneficio_plan.getBeneficio_Plan)
router.post('/create',beneficio_plan.createBeneficio_Plan)
router.put('/update',beneficio_plan.updateBeneficio_Plan)
router.delete('/delete/:id', beneficio_plan.deleteBeneficio_Plan)

module.exports=router
/** 
* @swagger
*definitions:
*  Beneficio_Plan:           
*    type: object
*    required:
*      - cod_Beneficio_Plan
*    properties:
*      cod_Beneficio_Plan:
*        type: integer
*/