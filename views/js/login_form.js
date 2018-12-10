
function formhash(form, password) {
    // Crea un elemento di input che verrà usato come campo di output per la password criptata.
    var p = document.createElement("input");
    p.name = "password_hash";
    p.type = "hidden";
    p.value = hex_sha512(password.value);
    //p.value = password.value;
    // Aggiungi un nuovo elemento al tuo form.
    form.appendChild(p);
    // Assicurati che la password non venga inviata in chiaro.
    password.value = "";
    // Come ultimo passaggio, esegui il 'submit' del form.
    form.submit();
 }