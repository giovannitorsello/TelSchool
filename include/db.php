<?php

// QUESTO DB GESTISCE IL DATABASE DEI DESTINATARI
define("HOST", "localhost"); // E' il server a cui ti vuoi connettere.
define("USER", "stusend"); // E' l'utente con cui ti collegherai al DB.
define("PASSWORD", "stusend"); // Password di accesso al DB.
define("DATABASE", "stusend"); // Nome del database.




//Operazioni preliminari
//controllo utenti
$studenti_non_associati=cerca_utenti_non_associati("studente");
$genitori_non_associati=cerca_utenti_non_associati("genitore");
//$dipendenti_non_associati=cerca_utenti_non_associati($dipendenti_non_associati, "dipendente");
//Cerca e memorizza la lista delle sezioni
$sezioni=cerca_sezioni();


function is_superuser($username) {
    return true;
    $mysqli=connect_db();
    if(login_check($mysqli) == true) { 
        //check superuser
        $superuser = 0;
        $sql = "SELECT username, superuser FROM members WHERE (username='".$username."');";
        $result = $mysqli->query($sql);
        
        if ($result && $result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                if($row['superuser'] == 1 && $_SESSION['username']== $row['username']  ) return 1;
                
            }
        }
    }
}


function cerca_utenti_non_associati($type) {
    $mysqli=connect_db();
    $utenti = array();
    $sql="";

    if($type=="studente")
        $sql = "SELECT id,chat_id FROM utenti WHERE (chat_id = 0);";    
    if($type=="genitore")
        $sql = "SELECT id,chat_id_pa,chat_id_ma FROM utenti WHERE (chat_id_pa = 0 OR chat_id_ma = 0);";
    if($type=="personale")
        $sql = "SELECT id,chat_id FROM dipendenti WHERE (chat_id);";
    
    //printf("%s\n",$sql);
    $result = $mysqli->query($sql);
    
    if ($result && $result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            array_push($utenti, $row['id']);
        }
    }
    return $utenti;
}

//Funzione che restituisce le sezioni rilevate dal database
function cerca_sezioni() {
    $sezioni=array();
    $mysqli=connect_db();
    $sql = "SELECT DISTINCT sez FROM utenti";
    $sez = $mysqli->query($sql);
    if ($sez->num_rows > 0) {
        while($row = $sez->fetch_assoc()) {
            array_push($sezioni, $row['sez']);            
        }
    }
    return $sezioni;
}

function get_all_person_bytype($type){
    $mysqli=connect_db();
    $utenti = array();
    $sql="";

    if($type=="studente")
        $sql = "SELECT id,chat_id,nome,cognome,classe,sez FROM utenti WHERE (chat_id != 0);";    
    if($type=="genitore")
        $sql = "SELECT id,chat_id_pa,chat_id_ma,classe,sez FROM utenti WHERE (chat_id_pa != 0 OR chat_id_ma != 0);";
    if($type=="personale")
        $sql = "SELECT id,nome,cognome,chat_id FROM dipendenti WHERE (chat_id != 0);";
    
    //printf("%s\n",$sql);
    $result = $mysqli->query($sql);
    
    if ($result && $result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            array_push($utenti, $row);
        }
    }
    return $utenti;
}

//Connessione al database e restituzione id di connessione
function connect_db() {
    //avoid reopen if exists
    if(isset($mysqli) && $mysqli != NULL) return $mysqli;
    $mysqli = new mysqli(HOST, USER, PASSWORD, DATABASE);
    if($mysqli) {
        //printf("Connection successfull\n");
        return $mysqli;
    }
    if ($mysqli->connect_error) {
        die("connection failed: " . $mysqli->connect_error);
        header("Location: ../index.php?ErrorConnectionDatabase");
    } 
}

function close_db() {
    //avoid reopen if exists
    if(isset($mysqli) && $mysqli != NULL) 
        $mysqli->close();
}

?>