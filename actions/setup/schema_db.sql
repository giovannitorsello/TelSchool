CREATE TABLE IF NOT EXISTS persone(
    id INT AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    cognome VARCHAR(255) NOT NULL,
    dat_nas VARCHAR(255) NOT NULL,
    com_nas VARCHAR(255) NOT NULL,
    pro_nas VARCHAR(255) NOT NULL,
    res_com VARCHAR(255) NOT NULL,
    res_ind VARCHAR(255) NOT NULL,
    res_cap VARCHAR(255) NOT NULL,
    res_pro VARCHAR(255) NOT NULL,
    cod_fisc VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(255) NOT NULL UNIQUE,
    reg_date DATE,
    start_date DATE,
    chat_id BIGINT(255) UNIQUE,  
    PRIMARY KEY (id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS famiglia(
    id INT AUTO_INCREMENT,
    id_persona_A VARCHAR(255) NOT NULL,
    id_persona_B VARCHAR(255) NOT NULL,
    ruolo_B VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS organizzazione(
    id INT AUTO_INCREMENT,
    id_persona VARCHAR(255) NOT NULL,
    classe VARCHAR(255) NOT NULL,
    sezione VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE login_attempts (
  user_id int(11) NOT NULL,
  time varchar(30) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE members (
  id int(11) NOT NULL DEFAULT '0',
  username varchar(30) NOT NULL,
  email varchar(50) NOT NULL,
  password char(128) NOT NULL,
  salt char(128) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE uploads (
  id int(6) unsigned NOT NULL AUTO_INCREMENT,
  name varchar(30) NOT NULL,
  reg_date timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

CREATE TABLE utenti (
  id int(20) unsigned NOT NULL AUTO_INCREMENT,
  cognome varchar(30) NOT NULL,
  nome varchar(255) NOT NULL,
  datan varchar(255) NOT NULL,
  sesso varchar(255) NOT NULL,
  stato_na varchar(255) NOT NULL,
  com_nasc varchar(255) NOT NULL,
  pr_na varchar(255) DEFAULT NULL,
  com_res varchar(255) DEFAULT NULL,
  ind_res mediumtext,
  pr_res varchar(255) NOT NULL,
  cod_fisc varchar(255) NOT NULL,
  cf_pa varchar(255) DEFAULT NULL,
  cf_ma varchar(255) DEFAULT NULL,
  email_pa mediumtext,
  email_ma mediumtext,
  email_gen mediumtext,
  cell_gen mediumtext,
  cell_ma mediumtext,
  cell_pa mediumtext,
  telefono_pa mediumtext,
  telefono_ma mediumtext,
  telefono_gen mediumtext,
  cell mediumtext,
  cl int(255) DEFAULT NULL,
  barcode int(255) DEFAULT NULL,
sez varchar(255) DEFAULT NULL,
  classe varchar(10) DEFAULT NULL,
  anno varchar(10) DEFAULT NULL,
  casuale int(255) DEFAULT NULL,
  reg_date timestamp NULL DEFAULT NULL,
  chat_id bigint(255) NOT NULL,
  chat_id_pa bigint(255) NOT NULL,
  chat_id_ma bigint(20) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;



