<?php
include_once 'db.php';
include_once 'session.php';


function ui_formcontrol_sezioni()
{
    $sezioni=cerca_sezioni();
    $str_html="";    
    echo('
            <label for="Classe">Sezioni</label>
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input sezioni" id="all_sez" name="all_sez" value="Yes">
                <label class="custom-control-label" for="all_sez">Tutte</label>
            </div>
    ');

    foreach ($sezioni as $sez) {
       echo(
            '<div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input sezioni" 
                    id="'.$sez.'" 
                    name="'.$sez.'" selected>
              <label class="custom-control-label" 
                    for="'.$sez.'">'.$sez.'</label>
            </div>'
        );
    }
}

function ui_control_categorie_utenti() {
    echo(
                '
                <label for="GS">Destinatari</label>
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input tipologie_utenti" id="all_ute" name="all_ute" value="Yes">
                  <label class="custom-control-label" for="all_ute">Tutti</label>
                </div>
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input tipologie_utenti" id="studenti" name="studenti" value="Yes">
                  <label class="custom-control-label" for="studenti">Studenti</label>
                </div>
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input tipologie_utenti" id="genitori" name="genitori" value="Yes">
                  <label class="custom-control-label" for="genitori">Genitori</label>
                </div>
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input tipologie_utenti" id="dipendenti" name="dipendenti" value="Yes">
                  <label class="custom-control-label" for="dipendenti">Dipendenti</label>
                </div>'
    );
}

function ui_control_classi() {

    echo '
            <label for="Sezione">Classe</label>
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input  classi" id="all_class" name="all_class" value="Yes">
                <label class="custom-control-label" for="all_class">Tutte</label>
            </div>

            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input classi" id="1" name="1" value="Yes">
                <label class="custom-control-label" for="1">1</label>
            </div>
            
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input classi" id="2" name="2" value="Yes">
                <label class="custom-control-label" for="2">2</label>
            </div>
            
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input classi" id="3" name="3" value="Yes">
                <label class="custom-control-label" for="3">3</label>
            </div>

            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input classi" id="4" name="4" value="Yes">
                <label class="custom-control-label" for="4">4</label>
            </div>
            
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input classi" id="5" name="5" value="Yes">
                <label class="custom-control-label" for="5">5</label>
            </div>';
}


?>