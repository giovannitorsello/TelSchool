CREATE DATABASE IF NOT EXISTS telschool; 

CREATE TABLE IF NOT EXISTS persone(
    id          INT AUTO_INCREMENT,
    nome        VARCHAR(100) NOT NULL,
    cognome     VARCHAR(100) NOT NULL,
    dat_nas     VARCHAR(100) DEFAULT NULL,
    com_nas     VARCHAR(100) DEFAULT NULL,
    pro_nas     VARCHAR(100) DEFAULT NULL,
    res_com     VARCHAR(100) DEFAULT NULL,
    res_ind     VARCHAR(100) DEFAULT NULL,
    res_cap     VARCHAR(100) DEFAULT NULL,
    res_pro     VARCHAR(100) DEFAULT NULL,
    tit_stu     VARCHAR(100) DEFAULT NULL,
    att_lav     VARCHAR(100) DEFAULT NULL,
    cod_fisc    VARCHAR(20)  NOT NULL UNIQUE,
    barcode     VARCHAR(20)  DEFAULT NULL,
    role        VARCHAR(100) NOT NULL,
    email       VARCHAR(100) DEFAULT NULL,
    phone       VARCHAR(20)  DEFAULT NULL,
    reg_date    DATE,
    start_date  DATE,
    chat_id     BIGINT(255) UNIQUE,  
    PRIMARY KEY (id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS famiglia(
    id             INT AUTO_INCREMENT,
    id_persona     INT          NOT NULL,
    cod_fisc_A     VARCHAR(100) NULL,
    cod_fisc_B     VARCHAR(100) NULL,
    cod_fisc_C     VARCHAR(100) NULL,
    ruolo_A        VARCHAR(100) NULL,
    ruolo_B        VARCHAR(100) NULL,
    ruolo_C        VARCHAR(100) NULL,
    PRIMARY        KEY (id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS organizzazione(
    id          INT AUTO_INCREMENT,
    id_persona  INT           NOT NULL,
    cod_fisc    VARCHAR(20)   NOT NULL,
    classe      VARCHAR(20)   NOT NULL,
    sezione     VARCHAR(20)   NOT NULL,
    ruolo       VARCHAR(100)  NOT NULL,
    PRIMARY     KEY (id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS message(
    id            INT AUTO_INCREMENT,    
    subject       VARCHAR(200)  NOT NULL,
    text          VARCHAR(1000) NOT NULL,    
    user          VARCHAR(20)   NOT NULL,
    date          DATE          NOT NULL,
    messagedata blob, 
    CHECK (JSON_VALID(messagedata)), 
    PRIMARY KEY (id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE login_attempts (
  user_id   INT NOT NULL,
  time      INT NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE members (
  id        INT NOT NULL AUTO_INCREMENT,
  username  VARCHAR(50)   NOT NULL,
  email     VARCHAR(50)   NOT NULL,
  password  VARCHAR(50)   NOT NULL,
  salt      VARCHAR(128)  NOT NULL,
  PRIMARY           KEY (id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE uploads (
  id        INT         NOT NULL AUTO_INCREMENT,
  name      VARCHAR(30) NOT NULL,
  reg_date  TIMESTAMP   NULL DEFAULT NULL,
  PRIMARY   KEY (id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE argo (
  id            INT           NOT NULL AUTO_INCREMENT,
  cognome       VARCHAR(100)  NOT NULL,
  nome          VARCHAR(100)  NOT NULL,
  datan         VARCHAR(20)   NOT NULL,
  sesso         VARCHAR(20)   NOT NULL,
  stato_na      VARCHAR(100)  NOT NULL,
  com_nasc      VARCHAR(100)  NOT NULL,
  pr_na         VARCHAR(100)  DEFAULT NULL,
  com_res       VARCHAR(100)  DEFAULT NULL,
  ind_res       VARCHAR(100)  DEFAULT NULL,
  pr_res        VARCHAR(100)  NOT NULL,
  cod_fisc      VARCHAR(20)   NOT NULL,
  cf_pa         VARCHAR(20)   DEFAULT NULL,
  cf_ma         VARCHAR(20)   DEFAULT NULL,
  email_pa      VARCHAR(20)   DEFAULT NULL,
  email_ma      VARCHAR(20)   DEFAULT NULL,
  email_gen     VARCHAR(20)   DEFAULT NULL,
  cell_gen      VARCHAR(20)   DEFAULT NULL,
  cell_ma       VARCHAR(20)   DEFAULT NULL,
  cell_pa       VARCHAR(20)   DEFAULT NULL,
  telefono_pa   VARCHAR(20)   DEFAULT NULL,
  telefono_ma   VARCHAR(20)   DEFAULT NULL,
  telefono_gen  VARCHAR(20)   DEFAULT NULL,
  cell          VARCHAR(20)   DEFAULT NULL,
  cl            INT           DEFAULT NULL,
  barcode       INT           DEFAULT NULL,
  sez           VARCHAR(10)   DEFAULT NULL,
  classe        VARCHAR(10)   DEFAULT NULL,
  anno          VARCHAR(10)   DEFAULT NULL,
  casuale       INT           DEFAULT NULL,
  reg_date      DATE          NOT NULL,
  chat_id       VARCHAR(255)  NOT NULL,
  chat_id_pa    VARCHAR(255)  NOT NULL,
  chat_id_ma    VARCHAR(255)  NOT NULL,
  PRIMARY KEY (id)
) ENGINE=MyISAM CHARSET=utf8;



