
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var schedule = require('node-schedule');
var session = require('express-session');
var moment = require('moment');
var path = require('path');
var sha512 = require('js-sha512');
var md5 = require('md5');
var http = require('http');
var url = require('url');
var moment = require('moment');
const { StringDecoder } = require('string_decoder');
const Telegram = require('telegram-send-message');


// Needed fo xls import
var express_formidable = require('express-formidable');
var formidable = require('formidable');
var fs = require('fs');
var xlsx = require('xlsx');
var xlsx_node = require('node-xlsx');
var xlsx_json = require('xlsx-parse-json');
//local requirements
var config = require('./config.js');
var global = require('./global.js');
var db = require('./database.js');
//var mail = require('./mail.js');

//upload folder
upload = multer({ dest: 'uploads/' });


//Session data
var session_data = { name: 'crmpbx', secret: 'wifinetcom2019', cookie: { maxAge: 6. / 0000 } };

var app = express();
var router = express.Router();
var upload = multer(); // for parsing multipart/form-data
var path_static = path.join(__dirname, 'views');
var path_uploaded_documents = "/tmp"
//enforcing
app.disable('x-powered-by');

app.use(session(session_data));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use('/static', express.static(path_static));
app.use('/download', express.static(config.upload_datadir));

app.use("/", router);
//For upload
app.use(express_formidable({
    encoding: 'utf-8',
    uploadDir: path.join(__dirname, 'uploads'),
    multiples: true,
    keepExtensions: true// req.files to be arrays of files
}));


app.listen(8088, function () {
    console.log('Server is started.');
    //Start db connection
    db.start_connection();
});

router.post('/insert/customer', function (request, response) {
    var rb = request.body;
    data = [rb.nome, rb.cognome, rb.dat_nas, rb.com_nas, rb.pro_nas, rb.res_com,
    rb.res_ind, rb.res_cap, rb.res_pro, rb.cod_fisc, rb.role, rb.email, rb.phone];
    db.insert_persona(data, response.json);
});

router.post('/search/dipendenti', function (request, response) {
    db.get_all_persone("dipendente", function (result) { response.json(result); });
});

router.post('/search/genitori', function (request, response) {
    db.get_parents(function (result) { response.json(result); });
});

router.post('/search/studenti', function (request, response) {
    db.get_students(function (result) { response.json(result); });
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
    username = "torsello"; password_hash_form = sha512("essequel");
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
    delete (sessions, token);

    //delete all cookies
    cookie = req.cookies;
    for (var prop in cookie) {
        if (!cookie.hasOwnProperty(prop)) { continue; }
        res.cookie(prop, '', { expires: new Date(0) });
    }
    //destroy this session
    req.session.account = null;
    req.session.destroy();
    res.redirect('/');
});


router.post('/import/parents', function (req, res, next) {
    var form = new formidable.IncomingForm();
    var file_uploaded;
    form.parse(req);
    form.on('fileBegin', function (name, file) {
        file.path = __dirname + '/uploads/' + file.name;
        file_uploaded = file.path;
    });

    form.on('file', function (name, file) {
        console.log('Uploaded ' + file.name);
        var workbook = xlsx.readFile(file_uploaded);
        var sheet_name_list = workbook.SheetNames;
        var obj = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

        if (obj && obj.length > 0)
            obj.forEach(function (element, index) {
                console.log(element);
                //element=JSON.parse(element); //transform string in obect
                db.insert_parents(element, function (d) {
                    if (index === obj.length)
                        res.send(JSON.stringify({ status: 'ok' }));
                });
            });
    });
});

router.post('/import/school_data', function (req, res, next) {
    var form = new formidable.IncomingForm();
    var file_uploaded;
    form.parse(req);
    form.on('fileBegin', function (name, file) {
        file.path = __dirname + '/uploads/' + file.name;
        file_uploaded = file.path;
    });

    form.on('file', function (name, file) {
        console.log('Uploaded ' + file.name);
        var workbook = xlsx.readFile(file_uploaded);
        var sheet_name_list = workbook.SheetNames;
        var obj = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

        if (obj && obj.length > 0)
            obj.forEach(function (element, index) {
                console.log(element);
                //element=JSON.parse(element); //transform string in obect
                db.insert_students(element, function (d) {
                    if (index === obj.length)
                        res.send(JSON.stringify({ status: 'ok' }));
                });
            });
    });
});


router.post('/import/datiscolastici', function (req, res, next) {
    var form = new formidable.IncomingForm();
    var file_uploaded;
    form.parse(req);
    form.on('fileBegin', function (name, file) {
        file.path = __dirname + '/uploads/' + file.name;
        file_uploaded = file.path;
    });

    form.on('file', function (name, file) {
        console.log('Uploaded ' + file.name);
        var workbook = xlsx.readFile(file_uploaded);
        var sheet_name_list = workbook.SheetNames;
        var obj = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

        if (obj && obj.length > 0)
            obj.forEach(function (element, index) {
                console.log(element);
                //element=JSON.parse(element); //transform string in obect
                db.insert_classroom_data(element, function (d) {
                    if (index === obj.length)
                        res.send(JSON.stringify({ status: 'ok' }));
                });
            });
    });
});

router.post('/upload/get_attached_link', function (req, res, next) {
    var form = new formidable.IncomingForm();
    var file_url = "", file_original_name = "";
    form.parse(req);
    form.on('fileBegin', function (name, file) {
        var timestamp = (new Date()).getTime();
        var ext = file.name.split('.').pop();
        file_original_name = file.name;
        file.name = md5(file.name + timestamp) + "." + ext;
        file.path = config.upload_datadir + '/' + file.name;
        var hostname = config.download_host;
        var folder = config.download_folder;
        file_url = hostname + folder + file.name;
    });

    form.on('file', function (name, file) {
        console.log('Uploaded ' + file_url);
        res.send({ status: 'ok', file: { url: file_url, original_name: file_original_name } });
    });
});

router.post('/message/send', function (req, res, next) {
    var msgdt = req.body;
    if (msgdt) {
        msgdt.account = req.session.account;
        db.insert_message(msgdt, function (result) {
            var str_message = "OGGETTO: " + msgdt.subject + "\r\n";
            str_message += msgdt.text + "\r\n";
            if (msgdt.files) {
                msgdt.files.forEach(function (file, i_file) {
                    str_message += file.url + "\r\n";
                });
            }
            db.select_persons_by_messages(msgdt, function (result) {
                if (result.status === "ok") {
                    var tos = result.data;
                    tos.forEach(function (to, i_to) {
                        if (to.chat_id) {
                            Telegram.setToken(config.telegram_token);
                            Telegram.setRecipient(to.chat_id);
                            Telegram.setMessage(msgdt);
                            Telegram.send();
                            console.log(" Inviato a " + JSON.stringify(to));
                        }
                        
                    });
                }
            });
            res.send(result);
        });
    }
    else
        res.send({ status: 'error', message: "Error in insert messages." });
});

router.post('/search/classi', function (request, response) {
    db.get_distinct_list("organizzazione", "classe", function (result) { response.json(result); });
});

router.post('/search/sezioni', function (request, response) {
    db.get_distinct_list("organizzazione", "sezione", function (result) { response.json(result); });
});

router.post('/search/ruoli', function (request, response) {
    db.get_distinct_list("organizzazione", "ruolo", function (result) { response.json(result); });
});

router.post('/search/messaggi', function (request, response) {
    //Return messages n at time to manage paging in Datatable
    if (request.body.start) {
        var limit = request.body.length;
        var offset = request.body.start;
        db.get_all_messaggi(offset, limit, function (result) {
            if (result.status === "ok" && result.data) {
                var messages = [];
                result.data.forEach(function (msg, index_msg) {
                    msg.date = moment(msg.date).format("DD/MM/YYYY hh:mm");
                    //convert message data
                    var decoder = new StringDecoder('utf8');
                    var mess_data = decoder.write(msg.messagedata);
                    mess_data = JSON.parse(mess_data);
                    var str_to = format_destinations(mess_data);
                    messages.push([msg.date, msg.subject, msg.user, str_to, mess_data]);
                    if (index_msg == result.data.length - 1) response.json({ data: messages });
                });

                //Manage empty results
                if (result.data.length == 0) response.json({ data: messages });
            }
        });
    }
});


function format_destinations(msg) {
    var str_to = "";
    msg.dst_ruoli.forEach(function (ruolo, i_ruolo) {
        str_to += ruolo;
        if (i_ruolo < msg.dst_ruoli.length - 1) str_to += ",";
    });
    str_to += "|sezioni: ";
    msg.dst_sezioni.forEach(function (sezione, i_sezione) {
        str_to += sezione;
        if (i_sezione < msg.dst_sezioni.length - 1) str_to += ",";
    });
    str_to += "|classi: ";
    msg.dst_classi.forEach(function (classe, i_classe) {
        str_to += classe;
        if (i_classe < msg.dst_classi.length - 1) str_to += ",";
    });
    return str_to;
}