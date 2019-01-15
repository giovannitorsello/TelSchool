$(function () {
    setTimeout(load_components, 1000);
});

function load_components() {
    //Toolbars
    insert_component('#link_administrator_toolbar', '#administrator_toolbar', '#main_container');
    insert_component('#link_user_toolbar', '#user_toolbar', '#main_container');

    //Dialogs
    insert_component('#link_modal_errore', '#errore_inserimento', '#main_container');

    //Gestione registrazioni
    insert_component('#link_modal_registrazioni_pendenti', '#registrazioni_pendenti', '#main_container');
    insert_component('#link_modal_registrazioni_manuali', '#registrazioni_manuali', '#main_container');

    //Importazione dati
    insert_component('#link_modal_importazione_studenti', '#importazione_dati_studenti', '#main_container');
    
    //Gestione anagrafiche
    insert_component('#link_modal_anagrafiche_studenti', '#anagrafiche_studenti', '#main_container');
    insert_component('#link_modal_anagrafiche_genitori', '#anagrafiche_genitori', '#main_container');
    insert_component('#link_modal_anagrafiche_dipendenti', '#anagrafiche_dipendenti', '#main_container');

    //Gestione messaggi
    insert_component('#link_modal_nuovo_messaggio', '#nuovo_messaggio', '#main_container', false);
    insert_component('#link_messages_sent_view', '#messages_sent_view', '#main_container', false);

    bind_ajax_events();
}

function bind_ajax_events() {

    //Bind ajax events
    $(document).ajaxStart(function () {
        //$(".modal_wait_for_search").css("display", "");
        $(".modal_wait_for_search").show();
        $("#find").prop("disabled",true);
        //setTimeout(function () { }, 3000);
    });
    $(document).ajaxComplete(function () {
        //$("#modal_wait_for_search").css("display", "none");
        $(".modal_wait_for_search").hide();
        $("#find").prop("disabled",false);
    });
    $(document).ajaxStop(function () {
        //$("#modal_wait_for_search").css("display", "none");
        $(".modal_wait_for_search").hide();
        $("#find").prop("disabled",false);
    });

    
}

function insert_component(link_id, component_id, father_id, bhead = true) {
    var link = document.querySelector(link_id);
    if (!link) { console.log("Resource unknown. ->" + link_id); return }
    var main_container = document.querySelector(father_id);
    if (!main_container) { console.log("Component container not found. ->" + father_id); return }
    var component_link = link.import.querySelector(component_id);
    if (!component_link) { console.log("Component unknown. Wrong id. ->" + component_id); return }
    var component = document.importNode(component_link, true);
    if (!component) { console.log("Component empty. No tags in the code."); return }

    if (bhead) {
        main_container.insertBefore(component, main_container.childNodes[0]);
    }
    else {
        main_container.appendChild(component);
    }
}

function get_component(link_id, component_id) {
    var link = document.querySelector(link_id);
    if (!link) { console.log("Resource unknown. ->" + link_id); return }
    var component_link = link.import.querySelector(component_id);
    if (!component_link) { console.log("Component unknown. Wrong id. ->" + component_id); return }
    var component = document.importNode(component_link, true);
    if (!component) { console.log("Component empty. No tags in the code."); return }
    
    return component
}