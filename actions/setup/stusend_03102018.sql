-- MySQL dump 10.13  Distrib 5.6.42, for Linux (x86_64)
--
-- Host: localhost    Database: db_messaggi
-- ------------------------------------------------------
-- Server version	5.6.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `login_attempts`
--

DROP TABLE IF EXISTS `login_attempts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `login_attempts` (
  `user_id` int(11) NOT NULL,
  `time` varchar(30) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_attempts`
--

LOCK TABLES `login_attempts` WRITE;
/*!40000 ALTER TABLE `login_attempts` DISABLE KEYS */;
INSERT INTO `login_attempts` VALUES (2,'1536830473'),(2,'1536830487'),(1,'1536840454'),(1,'1536909558'),(2,'1537172080'),(4,'1537172127'),(1,'1541613028');
/*!40000 ALTER TABLE `login_attempts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `members` (
  `id` int(11) NOT NULL DEFAULT '0',
  `username` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` char(128) NOT NULL,
  `salt` char(128) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES (1,'test_user','test@example.com','00807432eae173f652f2064bdca1b61b290b52d40e429a7d295d76a71084aa96c0233b82f1feac45529e0726559645acaed6f3ae58a286b9f075916ebf66cacc','f9aab579fc1b41ed0c44fe4ecdbfcdb4cb99b9023abb241a6db833288f4eea3c02f76e0d35204a8695077dcf81932aa59006423976224be0390395bae152d4ef'),(4,'admin','francecarratta@gmail.com','c9dccfea67955d0a31c5375c401d7b759d891bffc4887c78dec025ed05f00882180bfadb282d627213624521abb2f410d4c5bc4e85b9c494d9867d570d93e66a','b5c050702be4021193dc21f8d1d9a3a509dcc883aee2babe86307828b89f5d968482f9cc68ffcc438d41dcce68e022c61e8235ab17c8d4b1d1e6dc621edc506a');
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `uploads`
--

DROP TABLE IF EXISTS `uploads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `uploads` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `reg_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uploads`
--

LOCK TABLES `uploads` WRITE;
/*!40000 ALTER TABLE `uploads` DISABLE KEYS */;
INSERT INTO `uploads` VALUES (1,'blallo.pdf',NULL),(2,'dawdwa.pdf',NULL),(3,'awdaw.pdf',NULL),(4,'awdawd.pdf',NULL),(5,'dawdwadwadadwd.pdf',NULL),(6,'xAS.pdf',NULL),(7,'awd.pdf',NULL),(8,'awda.pdf',NULL),(9,'2.pdf',NULL),(10,'wdaawd.pdf',NULL),(11,'scs.pdf',NULL),(12,'aa.pdf',NULL);
/*!40000 ALTER TABLE `uploads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utenti`
--

DROP TABLE IF EXISTS `utenti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `utenti` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `cognome` varchar(30) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `datan` varchar(255) NOT NULL,
  `sesso` varchar(255) NOT NULL,
  `stato_na` varchar(255) NOT NULL,
  `com_nasc` varchar(255) NOT NULL,
  `pr_na` varchar(255) DEFAULT NULL,
  `com_res` varchar(255) DEFAULT NULL,
  `ind_res` mediumtext,
  `pr_res` varchar(255) NOT NULL,
  `cod_fisc` varchar(255) NOT NULL,
  `cf_pa` varchar(255) DEFAULT NULL,
  `cf_ma` varchar(255) DEFAULT NULL,
  `email_pa` mediumtext,
  `email_ma` mediumtext,
  `email_gen` mediumtext,
  `cell_gen` mediumtext,
  `cell_ma` mediumtext,
  `cell_pa` mediumtext,
  `telefono_pa` mediumtext,
  `telefono_ma` mediumtext,
  `telefono_gen` mediumtext,
  `cell` mediumtext,
  `cl` int(255) DEFAULT NULL,
  `barcode` int(255) DEFAULT NULL,
  `sez` varchar(255) DEFAULT NULL,
  `classe` varchar(10) DEFAULT NULL,
  `anno` varchar(10) DEFAULT NULL,
  `casuale` int(255) DEFAULT NULL,
  `reg_date` timestamp NULL DEFAULT NULL,
  `chat_id` bigint(255) NOT NULL,
  `chat_id_pa` bigint(255) NOT NULL,
  `chat_id_ma` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utenti`
--

LOCK TABLES `utenti` WRITE;
/*!40000 ALTER TABLE `utenti` DISABLE KEYS */;
INSERT INTO `utenti` VALUES (1,'COGNOME ','NOME ','DATAN ','SESSO ','STATO_NA ','COM_NASC ','PR_NA ','COM_RES ','IND_RES ','PR_RES ','COD_FISC ','CF_PA ','CF_MA ','EMAIL_PA ','EMAIL_MA ','EMAIL_GEN ','CELL_GEN ','CELL_MA ','CELL_PA ','TELEFONO_PA ','TELEFONO_MA ','TELEFONO_GEN ','CELL ',0,0,'SEZ ',NULL,NULL,0,'0000-00-00 00:00:00',0,0,0),(2,'ALBANESE','ALESSIO','23/10/2000','M','ITALIA','GALATINA','LE','GALATINA','VIA GIOBERTI 33','LE','LBNLSS00R23D862N','LBNNTN74S06Z112O','DLCMLL79M67D862U','manunto@libero.it','manunto@libero.it','manunto@libero.it','******','******','******','3495392925','3387445919','3495392925','******',5,10258101,'C',NULL,NULL,0,'0000-00-00 00:00:00',0,0,0),(3,'APOLLONIO','FRANCESCO','22/03/2000','M','ITALIA','NARDO\'','LE','ARADEO','VIA MORANDI 1','LE','PLLFNC00C22F842N','','GRIMGR68P48A350B','******','grazia.giuri@libero.it','grazia.giuri@libero.it','******','******','******','','3280678760','3280678760','******',5,10258201,'C',NULL,NULL,0,'0000-00-00 00:00:00',0,0,0),(4,'D\'AMICO','MATTIA','11/07/2000','M','ITALIA','GALATINA','LE','GALATINA','VIA LAGO DI GARDA 57','LE','DMCMTT00L11D862E','DMCSNT58H01D862W','FRNMST59S43D862P','dinodamic58@gmail.com','******','dinodamic58@gmail.com','******','******','******','836630492','836630492','836630492','******',5,10259201,'C',NULL,NULL,0,'0000-00-00 00:00:00',0,0,0),(5,'DE LORENZIS','PIERO','22/11/2000','M','ITALIA','GALATINA','LE','GALATINA','VIA LOMBARDIA 84','LE','DLRPRI00S22D862G','DLRNTN66A13D862Z','LSITNM72L64D862H','antoniohoss@alice.it','antoniohoss@alice.it','antoniohoss@alice.it','******','******','******','836566790','836566790','836566790','******',5,10259501,'C',NULL,NULL,0,'0000-00-00 00:00:00',0,0,0),(6,'DE SIMONE','ALESSIO','01/01/2001','M','ITALIA','MAGLIE','LE','CUTROFIANO','VIA CONTRADA METALLO, SN','LE','DSMLSS01A01E815U','DSMJSS68L18Z133I','GRGMRS73L50D237N','JONES.68@LIBERO.IT','******','JONES.68@LIBERO.IT','******','******','******','3201565624','3201565624','3201565624','******',5,10259801,'C',NULL,NULL,0,'0000-00-00 00:00:00',0,0,0),(7,'ELIA','ALBERTO','21/05/2000','M','ITALIA','GALATINA','LE','GALATINA','VIA ROMA 232','LE','LEILRT00E21D862G','LEISGN64P05D862L','PCCRMN71B57D862B','******','romina.oicciolo@libero.it','******','******','******','******','3939371131','3287045252','3939371131','******',5,10260001,'C',NULL,NULL,0,'0000-00-00 00:00:00',0,0,0),(8,'INNOCENTA','FEDERICO','21/07/2000','M','ITALIA','GALATINA','LE','GALATINA','LARGO MILANO, 6','LE','NNCFRC00L21D862P','NNCSVT65L24D862X','DCEDAA67A60D862H','******','******','******','******','3343301428','******','3277650209','3343301428','3277650209','******',5,10260401,'C',NULL,NULL,0,'0000-00-00 00:00:00',0,0,0),(9,'LEVANTO','MARCO','23/05/2000','M','ITALIA','GALATINA','LE','GALATINA','VIA GROTTI, 72','LE','LVNMRC00E23D862P','LVNLSN73A06D862U','CPTMKT75T59F205W','sandro.levanto@alice.it','sandro.levanto@alice.it','sandro.levanto@alice.it','******','******','******','3392978011','3285385462','3392978011','******',5,10260501,'C',NULL,NULL,0,'0000-00-00 00:00:00',0,0,0),(10,'LISI','EMANUELE','25/03/2000','M','ITALIA','TRADATE','VA','GALATINA','Via Savona,15','LE','LSIMNL00C25L319P','LSILSN67P25D862U','SCTSRA67E55F158C','lisialessandro1967@libero.it','lisialessandro1967@libero.it','lisialessandro1967@libero.it','******','******','******','3313672091','3669128206','3313672091','******',5,10260601,'C',NULL,NULL,0,'0000-00-00 00:00:00',0,0,0),(11,'MANDORINO','GIORGIA','26/09/2000','F','ITALIA','GALATINA','LE','GALATINA','C.DA GLI SCORPI','LE','MNDGRG00P66D862M','MNDCMN65R11D862D','SRRNHL66H60Z110U','******','areacreativa@xent.it','******','335443962','******','335443962','******','3394783041','******','******',5,10260701,'C',NULL,NULL,0,'0000-00-00 00:00:00',0,0,0),(12,'MARZO','WILLIAM','07/07/2000','M','ITALIA','GALATINA','LE','GALATINA','via gorizia 19','LE','MRZWLM00L07D862V','MRZPLA69M11D862X','CNGDLR68L70D862V','marpao1969@libero.it','******','marpao1969@libero.it','******','******','******','393385482036','3201139885','393385482036','******',5,10261001,'C',NULL,NULL,0,'0000-00-00 00:00:00',0,0,0),(13,'MASCIULLO','PIERANTONIO','14/06/2000','M','ITALIA','GALATINA','LE','GALATINA','via castel del monte 12','LE','MSCPNT00H14D862A','MSCDNT57E22D862W','LNGRLB68A42D862Q','pierantoniomasciullo@live.it','pierantoniomasciullo@live.it','pierantoniomasciullo@live.it','******','******','******','3291333612','836565440','3291333612','******',5,10261101,'C',NULL,NULL,0,'0000-00-00 00:00:00',0,0,0),(14,'MOSCARA','LUDOVICA','22/05/2000','F','ITALIA','GALATINA','LE','GALATINA','VIA FESTA DEL LAVORO, 41','LE','MSCLVC00E62D862O','MSCPTR66R24D862E','TNDNNT74T61D862E','pieromoscara1966@gmail.com','pieromoscara1966@gmail.com','pieromoscara1966@gmail.com','******','******','******','3926794648','3283387218','3926794648','******',5,10261401,'C',NULL,NULL,0,'0000-00-00 00:00:00',0,0,0),(15,'NOTARO','GABRIELE','27/11/2000','M','ITALIA','GALATINA','LE','GALATINA','Via Roma 42','LE','NTRGRL00S27D862H','NTRSVT68E15D862R','MNDMRS67H64D862H','gabriele.notaro@email.it','salvatore.not@gmail.com','gabriele.notaro@email.it','******','******','******','3356359795','3358348759','3356359795','******',5,10261501,'C',NULL,NULL,0,'0000-00-00 00:00:00',0,0,0),(16,'PANICO','GABRIELE','14/06/2000','M','ITALIA','NARDO\'','LE','CUTROFIANO','VIA GIUSEPPE CESARE ABBA 11','LE','PNCGRL00H14F842D','PNCCML69T11Z133W','RSSGPP71H43D862L','cosimoluigipanico@libero.it','gabrielegioele_2008@libero.it','cosimoluigipanico@libero.it','******','******','******','3333630753','3333630753','3333630753','******',5,10261601,'C',NULL,NULL,0,'0000-00-00 00:00:00',0,0,0),(17,'PERSICHINO','LORENZO','26/04/2000','M','ITALIA','GALATINA','LE','GALATINA','VIA GIADA N. 10','LE','PRSLNZ00D26D862Q','PRSNTN63C19D862U','NPLCML64H43D862U','edilstudio2000@virgilio.it','******','edilstudio2000@virgilio.it','******','******','******','836568833','836568833','836568833','******',5,10261901,'C',NULL,NULL,0,'0000-00-00 00:00:00',0,0,0),(18,'PICERNO','GIUSEPPE','31/10/2000','M','ITALIA','GALATINA','LE','GALATINA','VIA ISCHIA 23','LE','PCRGPP00R31D862E','PCRNTN62A09A225I','VRGMDN59P47D862X','farm.picerno@alice.it','dottoressa.59@hotmail.it','farm.picerno@alice.it','******','3883436011','******','836562369','836562369','836562369','******',5,10262001,'C',NULL,NULL,0,'0000-00-00 00:00:00',0,0,0),(19,'QUIDA','LORENZO MARIA','16/02/2001','M','ITALIA','GALATINA','LE','GALATINA','VIA NAPOLI 45','LE','QDULNZ01B16D862C','QDULNR55M26D862D','','lucianooronzo.quida@tin.it','lucianooronzo.quida@tin.it','lucianooronzo.quida@tin.it','3485444493','******','3485444493','836568292','3485444493','836568292','******',5,10262101,'C',NULL,NULL,0,'0000-00-00 00:00:00',0,0,0),(20,'QUIDA','SARA','24/12/2000','F','ITALIA','GALATINA','LE','GALATINA','VIA CALATAFIMI 66','LE','QDUSRA00T64D862K','QDUDVD68P20D862Z','GNILSN73R68D862N','davidequida@libero.it','aleigini@libero.it','davidequida@libero.it','******','******','******','360514660','3283685087','360514660','******',5,10262201,'C',NULL,NULL,0,'0000-00-00 00:00:00',0,0,0),(21,'RIA','VALENTINA','03/08/2000','F','ITALIA','GALATINA','LE','GALATINA','VIA VERNALEONE, 1','LE','RIAVNT00M43D862K','RIAGPP50T01C865E','RZZMRS59M45D883G','pinoria@libero.it','mariarosariarizzo92@libero.it','pinoria@libero.it','******','******','******','836568867','836568867','836568867','******',5,10262301,'C',NULL,NULL,0,'0000-00-00 00:00:00',0,0,0),(22,'ROSSETTI','ANNA','12/01/2001','F','ITALIA','NARDO\'','LE','GALATINA','VIA REDIPUGLIA, 7','LE','RSSNNA01A52F842N','RSSVCN54P68D862Z','MRNMNT55H52D862C','******','info@belledimore.it','******','******','******','******','3270439988','3939664746','3270439988','******',5,10262501,'C',NULL,NULL,0,'0000-00-00 00:00:00',0,0,0),(23,'TOMA','ALESSANDRO','07/03/2000','M','ITALIA','GALATINA','LE','GALATINA','VIA REGGIO EMILIA, 8','LE','TMOLSN00C07D862Z','TMORML64S11L711O','CLZNNL60S70D862V','romolotoma@gmail.com','******','romolotoma@gmail.com','******','******','******','836523316','836523316','836523316','******',5,10263401,'C',NULL,NULL,0,'0000-00-00 00:00:00',0,0,0);
/*!40000 ALTER TABLE `utenti` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-03 18:34:12
