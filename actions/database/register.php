<?php

include_once '../../include/db.php';

function get_form_field($field)
{
    if(isset($_POST[$field])) return $_POST[$field];
    else return "aaa";
}

$nome=get_form_field("nome");
$cognome=get_form_field("cognome");
$cod_fisc=get_form_field("cod_fisc");
$dat_nas=get_form_field("dat_nas");
$com_nas=get_form_field("com_nas");
$pro_nas=get_form_field("pro_nas");
$res_com=get_form_field("res_com");
$res_ind=get_form_field("res_ind");
$res_cap=get_form_field("res_cap");
$res_pro=get_form_field("res_pro");
$role=get_form_field("role");
$email=get_form_field("email");
$phone=get_form_field("phone");

//Dati parentela
$cod_fis_par=get_form_field("cod_fis_par");

//dati classe sezione
$classe=get_form_field("classe");
$sezione=get_form_field("sezione");

$mysqli=connect_db();

$insert_stmt = $mysqli->prepare("INSERT INTO persone 
    (nome,cognome,dat_nas,com_nas,pro_nas,res_com,res_ind,res_cap,res_pro,cod_fisc,role,email,phone) 
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)");


if($insert_stmt)
{
    $insert_stmt->bind_param("sssssssssssss",$nome,$cognome,$dat_nas,$com_nas,$pro_nas,$res_com,$res_ind,$res_cap,$res_pro,$cod_fisc,$role,$email,$phone); 
    if($insert_stmt->execute())
    {
        //Associazione classe
        $id_persona=$mysqli->insert_id;
        if($classe!="" && $sezione!="")
        {
            $insert_stmt_org = $mysqli->prepare("INSERT INTO persone (id_persona,classe,sezione) VALUES (?,?,?)");
            if($insert_stmt_org) {
                $insert_stmt_org->bind_param("dss",$id_persona,$classe,$sezione);
                echo "{status: 'success', id_inserted: $id_persona}";
                exit;
            }
        }
        header('Content-Type: application/json');
        print json_encode('{"status": "ok", "mgs": "utente inserito"}');            
    }
    else {
        header('Content-Type: application/json');
        print json_encode('{"status": "error"}');    
    }
}
else
{
    header('Content-Type: application/json');
    print json_encode('{"status": "error"}');    
}
exit;

/* registraziome membro utente del software
if(isset($_POST['email'], $_POST['password'], $_POST['username'])) { 
    
    $email = $_POST['email'];
    $username = $_POST['username'];

    // Recupero la password criptata dal form di inserimento.
    $password = $_POST['password']; 
    // Crea una chiave casuale
    $random_salt = hash('sha512', uniqid(mt_rand(1, mt_getrandmax()), true));
    // Crea una password usando la chiave appena creata.
    $password = hash('sha512', $password);
    $password = hash('sha512', $password.$random_salt);
    // Inserisci a questo punto il codice SQL per eseguire la INSERT nel tuo database
    // Assicurati di usare statement SQL 'prepared'.
    if ($insert_stmt = $mysqli->prepare("INSERT INTO members (username, email, password, salt) VALUES (?, ?, ?, ?)")) {    
    $insert_stmt->bind_param('ssss', $username, $email, $password, $random_salt); 
    // Esegui la query ottenuta.
    $insert_stmt->execute();
        header('Location: ./index.php?successRegistration=1');
    } else {
        header('Location: ./index.php?errorRegistration=1');
    }

} else {
    header('Location: ./registrazione.php?empty=1'); 
}
*/

?>