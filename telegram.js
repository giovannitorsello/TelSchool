var telegram = require('telegram-bot-api');
var schedule = require('node-schedule');

//local requirements
var global = require('./global.js');
var config = require('./config.js');
var db = require('./database.js');

//Telgram API object
var api = new telegram({ token: config.telegram_token, updates: { enabled: true } });

api.on('message', function (message) {
    if (message) {
        var text_message = message.text;
        var n = text_message.search("EMAIL");
        if (n == 0) {
            db.register_email(message, function (result) {
                if (result.status === "ok" && result.data && result.data.chat) {
                    var chatid = result.data.chat.id;
                    api.sendMessage({
                        chat_id: chatid,
                        parse_mode: "HTML",
                        text: "Email aggiornata.\
                                Se vuoi rifare la registrazione basta reinserire\
                                il solo codice fiscale in maiuscolo."
                    }, function (err) {console.log(err)});
                    console.log("Email aggiornata: " + JSON.stringify(message));
                }
            });
        }
        else {
            db.register_telegram_chat_id(message, function (result) {
                if (result.status === "ok" && result.data && result.data.chat) {
                    var chatid = result.data.chat.id;
                    api.sendMessage({
                        chat_id: chatid,
                        parse_mode: "HTML",
                        text: "Registrato con successo.\
                               Adesso riceverai le nuove comunicazioni.\
                               Per registrare l'email batti il messaggio privo di spazi:\
                               <strong>EMAIL(giovanni.rossi@isp.it)</strong>"
                    }, function (err) {console.log(err)});
                    console.log("Utente registrato: " + JSON.stringify(message));
                }
            });
        }
    }
});

api.on('inline.query', function (message) {
    // Received inline query
    console.log(message);
});

api.on('inline.result', function (message) {
    // Received chosen inline result
    console.log(message);
});

api.on('inline.callback.query', function (message) {
    // New incoming callback query
    console.log(message);
});

api.on('edited.message', function (message) {
    // Message that was edited
    console.log(message);
});

api.on('update', function (message) {
    // Generic update object
    // Subscribe on it in case if you want to handle all possible
    // event types in one callback
});

api.getMe()
    .then(function (data) {
        config.telegram_account = data;
    })
    .catch(function (err) { console.log(err); });

module.exports = {
    send_message: function (chatid, str_message, callback) {
        api.sendMessage({
            chat_id: chatid,
            parse_mode: "HTML",
            text: str_message
        }, function (err) {
            if (err) {
                console.log(err);
                callback({ status: "error", data: err });
            }
            else {
                console.log("Messaggio inviato");
                callback({ status: "ok", data: str_message });
            }
        });
    },

    getMe: function () {
        api.getMe(function (result) {
            console.log(config.telegram_account);
        });
    }
}