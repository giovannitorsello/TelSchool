<?php

include 'utility.php';

$superuser=is_superuser("giovanni.torsello@gmail.com");

//controllo utenti
$studenti_non_associati= array();
$genitori_non_associati= array();
$dipendenti_non_associati = array();
cerca_utenti_non_associati($studenti_non_associati, "studente");
cerca_utenti_non_associati($genitori_non_associati, "genitore");
//cerca_utenti_non_associati($dipendenti_non_associati, "dipendente");

?>