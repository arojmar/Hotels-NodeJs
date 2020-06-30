let connection = require('../config/db.js');
let sha1 = require('sha1');
let fs = require('fs');
let userController = {};

userController.listUser = (req, res) => {

    let sqlUsers = `SELECT * FROM user;`
    connection.query(sqlUsers, (err, resultUsers) => {
       res.render('users', { resultUsers });
    });
};


userController.loginUser = (req, res) => {
    res.render('login');
};

userController.checkLogin = (req, res) => {
    let user = req.body.emailUser;
    let password = sha1(req.body.passwordUser);

    let queryLogin = `SELECT email, password FROM user
                    WHERE email='${user}' AND password='${password}';`;
    connection.query(queryLogin, (err, resultLogin) => {
        if(err) throw err;
        if(!resultLogin[0].email) {
            res.redirect('login');   
        } else {
            res.redirect('../hotels');
        }
    });
};


userController.registerNewUser = (req, res) => {
    res.render('registerUser');
};

userController.registered = (req, res) => {
    let name = req.body.userName;
    let email = req.body.userEmail;
    let password = sha1(req.body.userPassword);
    
    if(req.file == undefined){

        let queryRegistration = `INSERT INTO user (name, email, password)
                                VALUES ('${name}','${email}',
                                '${password}');`;

        connection.query(queryRegistration, (err, resultRegistration) => {
            if(err) throw err;
            res.redirect('/users');
        });
    } else {
        let filename = req.file.filename;
        let queryRegistration = `INSERT INTO user (name, email, password, image)
                                VALUES ('${name}','${email}',
                                '${password}','${filename}');`;
        
        connection.query(queryRegistration, (err, resultRegistration) => {
            if(err) throw err;
            res.redirect('/users');
        });
    }
};


userController.editUser = (req, res) => {
    let idUser = req.params.idUser;
    let sqlUserToModify = `SELECT * FROM user WHERE iduser = ${idUser};`;
    
    connection.query(sqlUserToModify, (err, resultUserToModify) =>{
        if(err) throw err;
        res.render('editUser', {resultUserToModify : resultUserToModify[0]});
    });
};

userController.updateUser = (req, res) => {
    let idUser = req.params.idUser;
    let name = req.body.userName;
    let email = req.body.userEmail;

    if(req.file == undefined){
        
        if(req.body.userPassword != undefined){
            let password = sha1(req.body.userPassword);
            let sqlPassword = `UPDATE user SET password = '${password}'
                              WHERE iduser=${idUser};`;
            connection.query(sqlPassword, (err, resultPassword) => {
                if(err) throw err; 
            });
        }

        let sqlUpdateNoImage = `UPDATE user SET name = '${name}', email='${email}'
                                WHERE iduser=${idUser};`;
        connection.query(sqlUpdateNoImage, (err, resultUpdate) => { 
            if(err) throw err;
            res.redirect('../');
        });
    } else {

        if(req.body.userPassword != undefined){
            
            let password = sha1(req.body.userPassword);
            let sqlPassword = `UPDATE user SET password = '${password}'
                              WHERE iduser=${idUser};`;
            connection.query(sqlPassword, (err, resultPassword) => {
                if(err) throw err; 
            });
        }
        let image = req.file.filename;
        let sqlUpdateNoImage = `UPDATE user SET name = '${name}', email='${email}',
                                image ='${image}'
                                WHERE iduser = ${idUser};`;
        connection.query(sqlUpdateNoImage, (err, resultUpdateImg) => { 
            if(err) throw err;
            res.redirect('../');
        }); 
    }
};

userController.removeUser = (req, res) => {
    let idUser = req.params.idUser;

    let sqlImage = `SELECT image FROM user WHERE iduser='${idUser}';`;

    connection.query(sqlImage, (err, resultImage) => {

        if(err) throw err;
    
        if(resultImage[0].image != null){
            let filePath = `public/images/users/${resultImage[0].image}`;
            fs.unlinkSync(filePath);
        }

        let sqlUserToRemove = `DELETE FROM user WHERE idUser = ${idUser};`;
        connection.query(sqlUserToRemove, (err, resultRemove) => {
            if(err) throw err;
            res.redirect('/users');
        });
    });
};

module.exports = userController;