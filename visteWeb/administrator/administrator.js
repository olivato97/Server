/*
File di controllo della pagina Administrator
*/

// COSTRUTTORE
var Administrator = function () {
    this.args;
    this.tableUtenti = '';
    this.tableProfili = '';
    this.tablePermessi = '';
};


// PARTE GENERALE DELLA PAGINA CON UTILITY VARIE
Administrator.prototype.initPagina = function() {
    var _this = this;

    // TOLGO I TAB CHE NON DEVO VEDERE PER I PERMESSI
    if (!checkModuloPermesso("PERMESSO", "ADMINISTRATOR_TAB_UTENTI")) {
        modificaElementoDOM(1, "#li-utenti-tab");
        modificaElementoDOM(1, "#utenti");
    }

    if (!checkModuloPermesso("PERMESSO", "ADMINISTRATOR_TAB_PROFILI")) {
        modificaElementoDOM(1, "#li-profili-tab");
        modificaElementoDOM(1, "#profili");
    }

    if (!checkModuloPermesso("PERMESSO", "ADMINISTRATOR_TAB_PERMESSI")) {
        modificaElementoDOM(1, "#li-permessi-tab");
        modificaElementoDOM(1, "#permessi");
    }

    // CARICO GLI HANDLER DEI BOTTONI DEI TAB
    _this.initBottoniTab();


};


// INIZIALIZZA GLI HANDLER PER I PULSANTI DEI TAB
Administrator.prototype.initBottoniTab = function () {
    var _this = this;

    $('#utenti-tab').off('click').on('click', function () {
        _this.initTabUtenti();
    });

    $('#profili-tab').off('click').on('click', function () {
        _this.initTabProfili();
    });

    $('#permessi-tab').off('click').on('click', function () {
        _this.initTabPermessi();
    });

};


// PARTE TAB UTENTI
Administrator.prototype.initTabUtenti = function () {
    var _this = this;
};


// PARTE TAB PROFILI
Administrator.prototype.initTabProfili = function () {
    var _this = this;
};


// PARTE TAB PERMESSI
Administrator.prototype.initTabPermessi = function () {
    var _this = this;
};


// PARTE DI GESTIONE DELLA DATATABLE


