<?php
include '../include/db.php';

function send_message($testo, $chat_id) {
    //Token per invio messaggi
    $token = "bot588252903:AAHJo2cBW_kpUAVnH1fWqdg7RZq_dnBMLj8";
    $url = "https://api.telegram.org/" . $token . "/sendMessage?chat_id=" . $chat_id;
    $url = $url . "&text=" . urlencode($testo);
    $ch = curl_init();
    $optArray = array(
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true
    );
    curl_setopt_array($ch, $optArray);
    $result = curl_exec($ch);  
    print_r($result);  
    curl_close($ch);
}


function get_messages() {
    $token = "bot588252903:AAHJo2cBW_kpUAVnH1fWqdg7RZq_dnBMLj8";
    $url = "https://api.telegram.org/" . $token . "/getUpdates";
    $url = $url . "&text=" . urlencode($testo);
    $ch = curl_init();
    $optArray = array(
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true
    );
    curl_setopt_array($ch, $optArray);
    $result = curl_exec($ch);  
    curl_close($ch);
    return $result;  
}
?>