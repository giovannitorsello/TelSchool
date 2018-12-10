
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var schedule = require('node-schedule');
var session = require('express-session');
var moment = require('moment');
var path = require('path');
var sha512 = require('js-sha512');

//local requirements
var config = require('./config.js');
var global = require('./global.js');
var db = require('./database.js');
//var mail = require('./mail.js');

//Session data
var session_data = { name: 'crmpbx', secret: 'wifinetcom2019', cookie: { maxAge: 6. / 0000 } };

var app = express();
var router = express.Router();
var upload = multer(); // for parsing multipart/form-data
var path_static = path.join(__dirname, 'views');

//enforcing
app.disable('x-powered-by');

app.use(session(session_data));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use('/static', express.static(path_static));
app.use("/", router);

app.listen(8088, function () {
    console.log('Server is started.');
    //Start db connection
    db.start_connection();
});

router.post('/insert/customer', function (request, response) {
    var rb=request.body;
    data=[rb.nome,rb.cognome,rb.dat_nas,rb.com_nas,rb.pro_nas,rb.res_com,
         rb.res_ind,rb.res_cap,rb.res_pro,rb.cod_fisc,rb.role,rb.email,rb.phone];
    db.insert_persona(data, response.json);
});

router.post('/search/dipendenti', function (request, response) {
    db.get_all_persone("dipendente",function (result) {response.json(result);});
});

router.post('/anagrafiche/studenti', function (request, response) {
    response.json(config.internal_phone_number);
});


router.post('/data/import', upload.array(), function (req, res, next) {

});

router.use(function (req, res, next) {
    console.log("/" + req.method);
    next();
});

router.get('/', function (req, res) {
    if (req.sessionID && req.session && req.session.account) {
        res.redirect('/main?token=' + req.sessionID);
    }
    else
        res.sendFile(path_static + "/login.html");
});

router.post('/login', upload.array(), function (req, res, next) {
    var username = req.body.username;
    var password_hash_form = req.body.password_hash;
    if (req.sessionID && req.session.account) {
        res.redirect('/main?token=' + req.sessionID);
    }

    config.admin_accounts.forEach(function auth(account) {
        var password_hash_db = sha512(account.password);
    
        if (username === account.username && password_hash_form === password_hash_db) {
            var timestamp = new Date().getTime();
            account.timestamp = timestamp;
            req.session.views++;
            req.session.account = account;
            sessions.set(req.sessionID, account)
            res.redirect('/main?token=' + req.sessionID);
        }
    });
    res.redirect('/');
});

router.get("/main", function (req, res) {
    var token = req.query.token;
    if (sessions.has(token)) {
        console.log("Logged in");
        console.log(req.session.account);
        res.sendFile(path_static + "/main.html");
    }
    else
        res.redirect('/');
});

router.post('/logout', upload.array(), function (req, res, next) {
    //Delete from sessions Map
    var token = req.query.token;
    delete(sessions,token);

    //delete all cookies
    cookie = req.cookies;
    for (var prop in cookie) {
        if (!cookie.hasOwnProperty(prop)) {continue;}    
        res.cookie(prop, '', {expires: new Date(0)});
    }
    //destroy this session
    req.session.account=null;
    req.session.destroy();
    res.redirect('/');
});
