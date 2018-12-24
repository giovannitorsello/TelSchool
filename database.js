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

  //Insert persona entity the customer service
  insert_persona: function (data, callback) {
    var sql = "INSERT INTO persone \
    (nome,cognome,dat_nas,com_nas,pro_nas,res_com,res_ind,res_cap,res_pro,cod_fisc,role,email,phone,tit_stu,att_lav,barcode) \
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
      sql = global.connection_mysql.format(sql, data);
      global.connection_mysql.query(sql, function (err, result) {
        if (err) {
          console.log("Inserimento fallito "+JSON.stringify(err));
          callback({status: "error", msg: JSON.stringify(err)});
        }
        else {
          console.log("Inserimento effettuato "+result.insertId);
          callback({status: "ok", msg: "Inserimento effettuato "+result.insertId});
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
  },

  insert_parents: function(data, callback) {
   /* Data format input from ARGO
  'COGNOME_PA ','NOME_PA ','PRNA_PA ','COMUNA_PA ','CF_PA ','COMURES_PA ','PRRES_PA ','CAPRES_PA ','INDRES_PA ','TELEFONO_PA ','CELL_PA ',
  'COGNOME_MA ','NOME_MA ','PRNA_MA ','COMUNA_MA ','CF_MA ','COMURES_MA ','PRRES_MA ','CAPRES_MA ','INDRES_MA ','TELEFONO_MA ','CELL_MA ',
  'COGNOME_GEN ','NOME_GEN ','PRNA_GEN ','COMUNA_GEN ','CF_GEN ','COMURES_GEN ','PRRES_GEN ','CAPRES_GEN ','INDRES_GEN ','TELEFONO_GEN ','CELL_GEN ',
  'DATA_PA ','DATA_MA ','DATA_GEN ','PINPAG ',
  'EMAIL_PA ','EMAIL_MA ','EMAIL_GEN ',
  'TITSTU_PA ','TITSTU_MA ','TITSTU_GEN ',
  'ATTIVITA_PA ','ATTIVITA_MA ','ATTIVITA_GEN ',
  'COD_SCUOLA_WSX '
  Database format
  (nome,cognome,dat_nas,com_nas,pro_nas,res_com,res_ind,res_cap,res_pro,cod_fisc,role,email,phone,tit_stu,att_lav)
  */

    var p={};
    p.role="genitore";
    console.log(data);
    console.log(data['NOME_PA']);
    p.nome=data.NOME_PA;    
    p.cognome=data.COGNOME_PA;
    p.pro_nas=data.PRNA_PA;
    p.com_nas=data.COMUNA_PA;
    p.cod_fisc=data.CF_PA;
    p.res_com=data.COMURES_PA;
    p.res_pro=data.PRRES_PA;
    p.res_cap=data.CAPRES_PA;
    p.res_ind=data.INDRES_PA;
    p.phone=data.TELEFONO_PA;
    p.email=data.EMAIL_PA;
    p.tit_stu=data.TITSTU_PA;
    p.att_lav=data.ATTIVITA_PA;
    p.barcode="";
    var father=[p.nome, p.cognome, p.dat_nas,p.com_nas,p.pro_nas,p.res_com,p.res_ind,p.res_cap,p.res_pro,p.cod_fisc,p.role,p.email,p.phone,p.tit_stu,p.att_lav,p.barcode];
    this.insert_persona(father, function(data){console.log("Dati padre inseriti");console.log(data);});

    var m={};
    m.role="genitore";
    m.nome=data.NOME_MA;    
    m.cognome= data.COGNOME_MA;
    m.pro_nas= data.PRNA_MA;
    m.com_nas= data.COMUNA_MA;
    m.cod_fisc= data.CF_MA;
    m.res_com= data.COMURES_MA;
    m.res_pro= data.PRRES_MA;
    m.res_cap= data.CAPRES_MA;
    m.res_ind= data.INDRES_MA;
    m.phone= data.TELEFONO_MA;
    m.email= data.EMAIL_MA;
    m.tit_stu= data.TITSTU_MA;
    m.att_lav= data.ATTIVITA_MA;
    m.barcode="";
    var mather=[m.nome, m.cognome, m.dat_nas,m.com_nas,m.pro_nas,m.res_com,m.res_ind,m.res_cap,m.res_pro,m.cod_fisc,m.role,m.email,m.phone,m.tit_stu,m.att_lav,m.barcode];
    this.insert_persona(mather, function(data){console.log("Dati madre inseriti");console.log(data);});

    //INSERIMENTO TUTORE LEGALE
    var t={};
    t.role="genitore";
    t.nome=data.NOME_GEN;    
    t.cognome= data.COGNOME_GEN;
    t.pro_nas= data.PRNA_GEN;
    t.com_nas= data.COMUNA_GEN;
    t.cod_fisc= data.CF_GEN;
    t.res_com= data.COMURES_GEN;
    t.res_pro= data.PRRES_GEN;
    t.res_cap= data.CAPRES_GEN;
    t.res_ind= data.INDRES_GEN;
    t.phone= data.TELEFONO_GEN;
    t.email= data.EMAIL_GEN;
    t.tit_stu= data.TITSTU_GEN;
    t.att_lav= data.ATTIVITA_GEN;
    t.barcode="";
    var tut_leg=[t.nome, t.cognome, t.dat_nas,t.com_nas,t.pro_nas,t.res_com,t.res_ind,t.res_cap,t.res_pro,t.cod_fisc,t.role,t.email,t.phone,t.tit_stu,t.att_lav,t.barcode];
    if(t && t.cod_fisc && t.cod_fisc.length>0 && t.phone && t.phone.length>0)
      this.insert_persona(tut_leg, function(data){console.log("Dati tutore legale inseriti");console.log(data);});

    callback(data);
  },

  insert_students: function(data, callback) {
     var s={};
     s.role="studente";
     s.nome=data.NOME;    
     s.cognome=data.COGNOME;
     s.dat_nas=data.DATAN
     s.com_nas=data.COM_NASC;
     s.pro_nas=data.PR_NA;
     s.cod_fisc=data.COD_FISC;
     s.res_com=data.COM_RES;
     s.res_pro=data.PR_RES;
     s.res_cap=data.CAP_RES;
     s.res_ind=data.IND_RES;
     s.barcode=data.BARCODE;
     
     if(data.TEL && data.TEL!=="")  s.phone=data.TEL;
     else if(data.CELL && data.CELL!=="") s.phone=data.CELL;
     else if(data.TEL2 && data.TEL2!=="")  s.phone=data.TEL2;
     else if(!s.phone || s.phone==="") s.phone="0833566833";

     s.email=data.E_MAIL;
     if(!s.email || s.email==="") s.email=s.cod_fisc+"@liceovallone.org";
     
     s.tit_stu="Licenza Scuola Secondaria di Primo Grado";
     s.att_lav="studente";
     var student=[s.nome,s.cognome,s.dat_nas,s.com_nas,s.pro_nas,s.res_com,s.res_ind,s.res_cap,s.res_pro,s.cod_fisc,s.role,s.email,s.phone,s.tit_stu,s.att_lav,s.barcode];
     this.insert_persona(student, function(data){console.log("Dati studente inseriti");console.log(data);});
 
     callback(data);
   },

   insert_classroom_data: function(data, callback) {
    var s={};
    s.role="studente";
    s.dat_nas=data.DATAN
    s.cod_fisc=data.COD_FISC;
    s.classe=data.CL;
    s.sezione=data.SEZ;
    s.indirizzo=data.SPEC;
    s.barcode=data.BARCODE;
    
    //this.insert_persona(student, function(data){console.log("Dati studente inseriti");console.log(data);});

    callback(data);
  }
}
