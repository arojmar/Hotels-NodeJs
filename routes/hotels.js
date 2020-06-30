var express = require('express');
var router = express.Router();
const hotelController = require('../controllers/hotelController.js');
const multer = require ('multer');

const storage = multer.diskStorage({
    //destino de la imagen ( donde voy a guardar la imagen )
    destination: "public/images/hotels",
    //edición del nombre del archivo
    filename: (_req, file, cb) => {
        const extension = file.originalname.slice(
            file.originalname.lastIndexOf(".")
        );
        cb(null, new Date().valueOf() + extension);
    }
});
//la configuracion de const storage la utilizamos y la concatenamos con el metodo single de multer que es
// para guardar una imagen (individual)
// ---single: 1 sola imagen
// ----multi: varias imagenes
const upload = multer({ storage }).single("hotelImage");

/* Se va a encargar de todos los metodos http e indicar el controlador */
// Lista todos los hoteles
router.get('/', hotelController.listHotels);

// Nos lleva al formulario de registro de nuevo hotel
router.get('/hotelForm', hotelController.showHotelForm);

// Recoge el formulario de registro de nuevo hotel
router.post('/saveHotel', upload, hotelController.saveHotel);

// Borra el hotel al clickar sobre el icono de papelera
router.get('/removeHotel/:idHotel', hotelController.removeHotel);

// Nos lleva al formulario de edicion al clickar en el icono edicion
router.get('/editHotel/:idhotel', hotelController.editHotel);

// Recoje los datos actualizados del formulario de edicion del hotel
router.post('/updateHotel/:idhotel', upload, hotelController.updateHotel);

module.exports = router;
