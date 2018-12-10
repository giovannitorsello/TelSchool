<?php
    include_once '../../include/session.php';   
    if(isset($_POST['username'], $_POST['password'])) { 
        $username = $_POST['username'];
        $password = $_POST['password']; // Recupero la password criptata.
    if(login($username, $password) == true) // Login eseguito
        header('Location: ../../assets/html/main.html');
    else // Login fallito
        header('Location: ../../assets/html/login.html');
    }
    else // Le variabili corrette non sono state inviate a questa pagina dal metodo POST.
        echo('Invalid Request');        
?>
