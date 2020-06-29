let connection = require('../config/db.js');
let userController = {};

userController.loginUser = (req, res) => {
    res.render('login');
};

userController.checkLogin = (req, res) => {
    let user = req.body.emailUser;
    let password = req.body.passwordUser;

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
    let name = req.body.nameUser;
    let email = req.body.emailUser;
    let password = req.body.passwordUser;
    let queryRegistration = `INSERT INTO user (name, email, password)
                            VALUES ('${name}','${email}','${password}');`;

    connection.query(queryRegistration, (err, resultRegistration) => {
        if(err) throw err;
        res.redirect('/users/login');
    });
};



//exportamos el objeto
module.exports = userController;