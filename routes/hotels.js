var express = require('express');
var router = express.Router();
const hotelController = require('../controllers/hotelController.js');

/* Se va a encargar de todos los metodos http e indicar el controlador */
router.get('/', hotelController.listHotels);

// 
router.get('/hotelForm', hotelController.showHotelForm);

//
router.post('/saveHotel', hotelController.saveHotel);

//Delete hotel
router.get('/removeHotel/:idHotel', hotelController.removeHotel);

router.get('/editHotel/:idhotel', hotelController.editHotel);

router.post('/updateHotel/:idhotel', hotelController.updateHotel);

module.exports = router;
