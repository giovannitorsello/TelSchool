<?php
    include_once '../../include/db.php';
    $mysqli=connect_db();
    $studenti = array();
    $sql = "SELECT * FROM persone WHERE(role='dipendente');";    
    $result = $mysqli->query($sql);
    
    header('Content-Type: application/json');
    if ($result && $result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            array_push($studenti, $row);
        }
    }
    print json_encode($studenti);
    exit;    
?>