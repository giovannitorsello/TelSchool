<?php
    include_once '../../include/db.php';
    include_once '../../include/bot.php';
    $mysqli=connect_db();
    $messages = get_messages();
    /*$sql = "SELECT * FROM messaggi;";    
    $result = $mysqli->query($sql);
    
    header('Content-Type: application/json');
    if ($result && $result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            array_push($studenti, $row);
        }
    }*/

    print json_encode($messages);
    exit;    
?>