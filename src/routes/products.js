// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); // MUESTRA LISTA PRODUCTOS

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create); // MUESTRA FORMULARIO DE CREACIÓN DE PRODUCTO
router.post('/create/', productsController.store); // ENVÍA INFO


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id/', productsController.detail); // MUESTRA DETALLE DE PRODUCTO

/*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit', productsController.edit);  // MUESTRA FORMULARIO DE EDICIÓN DE PRODUCTO
router.put('/:id', productsController.update); // RUTA POR LA QUE VIAJAN LOS DATOS DE EDICIÓN DE PRODUCTO


/*** DELETE ONE PRODUCT***/ 
router.delete('/detail/:id/', productsController.destroy); // RUTA POR LA QUE VIAJAN LOS DATOS DE PRODUCTO A ELIMINAR


module.exports = router;
