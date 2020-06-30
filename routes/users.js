var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController.js');
const multer = require ('multer');

const storage = multer.diskStorage({
    destination: "public/images/users",
    filename: (_req, file, cb) => {
        const extension = file.originalname.slice(
            file.originalname.lastIndexOf(".")
        );
        cb(null, new Date().valueOf() + extension);
    }
});
const upload = multer({ storage }).single("userImage");

/* RUTAS */
router.get('/', userController.listUser);

router.get('/login', userController.loginUser);

router.post('/checkLogin', userController.checkLogin);

router.get('/register', userController.registerNewUser); 

router.post('/registered', upload, userController.registered); 

router.get('/editUser/:idUser', upload, userController.editUser);

router.post('/updateUser/:idUser', upload, userController.updateUser);

router.get('/removeHotel/:idUser', userController.removeUser);

module.exports = router;
