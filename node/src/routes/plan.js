'use strict'
const express=require('express')
const router=express.Router()
const plan=require('../controllers/plan')
const auth=require('../middlewares/auth')
const multer  = require('multer')
const path=require('path')
const crypto=require('crypto')

/*const storage=multer.diskStorage({
    destination: './public/uploads/plans/',
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
 * /Plan/:
 *  get:
 *    tags: [Plan]
 *    description: Obtiene todos los Plans.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',plan.getPlans)
router.get('/id/:id',plan.getPlan)
router.post('/create',plan.createPlan)
router.post('/createAll', auth.isAuthAdmin ,plan.createAllPlan)
router.post('/updateAll', auth.isAuthAdmin ,plan.updateAllPlan)
router.put('/update', auth.isAuthAdmin ,plan.updatePlan)
router.delete('/delete/:id',  auth.isAuthAdmin , plan.deletePlan)

module.exports=router
/** 
* @swagger
*definitions:
*  Plan:           
*    type: object
*    required:
*      - cod_Plan
*    properties:
*      cod_Plan:
*        type: integer
*/