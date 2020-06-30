// Este archivo se va a encargar de toda la logica de la aplicacion (BACKEND)

// ----------------- LOGICA ---------------------
// La funcionalidad va dentro de este archivo

let connection = require('../config/db.js');
let fs = require('fs');
let hotelController = {};


hotelController.listHotels = (req, res) => {
    let sql = `SELECT * FROM hotel;`;
    connection.query(sql, (err, result) => {
      res.render('hotels',  {result});
    });
};
 
hotelController.showHotelForm = (req, res) => {
    res.render('registerHotels');
 };

hotelController.saveHotel = (req, res) => {
    let name = req.body.hotelName;
    let address = req.body.hotelAddress;
    let phone = req.body.hotelPhone;

    if(req.file == undefined){
        let sqlInsert = `INSERT INTO hotel (name, adress, phone)
                        VALUES ('${name}', '${address}', 
                        ${phone});`;
        connection.query(sqlInsert, (err, resultInsert) => {
            if(err) throw err;
            res.redirect('/hotels');
        });

    } else {
        let filename = req.file.filename;
        let sqlInsert = `INSERT INTO hotel (name, adress, phone, image)
                        VALUES ('${name}', '${address}', 
                        ${phone}, '${filename}');`;
        connection.query(sqlInsert, (err, resultInsert) => {
            if(err) throw err;
            res.redirect('/hotels');
        });
    }   
};

hotelController.removeHotel = (req, res) => {
    let idHotel = req.params.idHotel;

    let sqlImageToRemove = `SELECT image FROM hotel WHERE idhotel =${idHotel}`;

    connection.query(sqlImageToRemove, (err, resultImgToRemove) => {
        
        if(err) throw err;

        if(resultImgToRemove[0].image != null){
            var filePath = `public/images/hotels/${resultImgToRemove[0].image}`;
            fs.unlinkSync(filePath);
        }
       
        let sqlRemove = `DELETE FROM hotel WHERE idhotel = ${idHotel};`;
        connection.query(sqlRemove, (err, resultDelete) => {
            if(err) throw err;
            res.redirect('/hotels');
        });
    });
};

hotelController.editHotel = (req, res) => {
    let idhotel = req.params.idhotel;
    let sqlView = `SELECT * FROM hotel WHERE idhotel = ${idhotel};`;

    connection.query(sqlView, (err, result) => {
        if(err) throw err;
        res.render('editHotel', {result : result[0]});
    });
};

hotelController.updateHotel = (req, res) => {
    let idhotel = req.params.idhotel;
    let name = req.body.hotelName;
    let address = req.body.hotelAddress;
    let phone = req.body.hotelPhone;
    //var filename = null;
    if(req.file == undefined){

        let sqlUpdate = `UPDATE hotel 
                    SET name = '${name}', adress = '${address}',
                    phone = ${phone} WHERE idhotel = ${idhotel};`;
        connection.query(sqlUpdate, (err, resultUpdate) =>{
            if(err) throw err;
            res.redirect('/hotels');
        });
    } else {
        let filename = req.file.filename;
        let sqlUpdate = `UPDATE hotel 
                    SET name = '${name}', adress = '${address}',
                    phone = ${phone}, image = '${filename}'
                    WHERE idhotel = ${idhotel};`;
        connection.query(sqlUpdate, (err, resultUpdate) =>{
            if(err) throw err;
            res.redirect('/hotels');
         });
    }
};

//exportamos el objeto
module.exports = hotelController;