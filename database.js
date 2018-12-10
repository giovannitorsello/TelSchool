var global = require('./global.js');
var config = require('./config.js');
var fs = require('fs');
var mysql = require('mysql');
var moment = require('moment');
const hash = require('crypto').createHash;
const { StringDecoder } = require('string_decoder');

module.exports = {

  //Open connection and configure database for first use;
  start_connection: function () {
    global.connection_mysql = mysql.createConnection({
      host: "localhost",
      user: "telschool",
      password: "telschool",
      database: "telschool",
      multipleStatements: true
    });

    global.connection_mysql.connect(function (err) {
      if (err) { console.log(err); process.exit(); }
      else {
        console.log("Connected!");
        //Read DB Schema and create database;
        fs.readFile(config.database_config, 'utf8', function (err, sql) {
          global.connection_mysql.query(sql, function (err, result) {
            if (err) console.log("Table existing or connection error");
            else console.log("Table created");
          });
        });
      }
    });
  },

  //Insert persona entity the cusomer service
  insert_persona: function (data, callback) {
    var sql = "INSERT INTO persone \
    (nome,cognome,dat_nas,com_nas,pro_nas,res_com,res_ind,res_cap,res_pro,cod_fisc,role,email,phone) \
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
      sql = global.connection_mysql.format(sql, data);
      global.connection_mysql.query(sql, function (err, result) {
        if (err) {
          console.log("Inserimento fallito "+JSON.stringify(err));
          callback({status: "error", msg: JSON.stringify(err)});
        }
        else {
          console.log("Inserimento effettuato "+result.insertId);
          callback({status: "ok", msg: "nserimento effettuato "+result.insertId});
        }
      });
  },

  get_all_persone: function (role, callback) {
    var sql = "SELECT * FROM persone WHERE(role='"+role+"');";
    global.connection_mysql.query(sql, function (err, result) {
        if (err) {
          console.log("Ricerca fallita "+JSON.stringify(err));
          callback({status: "error", msg: JSON.stringify(err)});
        }
        else {
          console.log("Ricerca effettuata "+result.length);
          callback({data: result, status: "ok", msg: "Ricerca effettuata "+result.length});
        }
      });
  }

}
