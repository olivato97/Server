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
Administrator.prototype.initPagina = function () {
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
    _this.initHandlerTab();

};


// INIZIALIZZA GLI HANDLER PER I PULSANTI DEI TAB
Administrator.prototype.initHandlerTab = function () {
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

    if (_this.tableUtenti === '') {
        _this.loadTableUtenti();
    } else {
        _this.refreshTableUtenti();
    }

};

Administrator.prototype.loadTableUtenti = function () {
    var _this = this;

    _this.initDtButtonUtenti();
    _this.initDtColumnsUtenti();

    _this.tableUtenti = $('#tableUtenti').DataTable({
        responsive: true,
        lengthChange: true,
        select: true,
        autoWidth: true,
        dom: "HFBfrtip",
        paging: true,
        deferRender: true,
        stateSave: true,
        colReorder: true,
        pagingType: "full_numbers",
        lengthMenu: [
            [10, 25, 50, 100],
            ['10 righe', '25 righe', '50 righe', '100 righe']
        ],
        language: {
            paginate: {
                first: '<i class="fa fa-angle-double-left" aria-hidden="true"></i>',
                previous: '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                next: '<i class="fa fa-angle-right" aria-hidden="true"></i>',
                last: '<i class="fa fa-angle-double-right" aria-hidden="true"></i>'
            },
            info: "Pagina _PAGE_ di _PAGES_",
            infoEmpty: "",
            infoFiltered: "",
            zeroRecords: "Nessun record trovato",
            emptyTable: "Nessun record disponibile",
            search: '<i class="fa fa-search" aria-hidden="true"></i>',
            select: {
                rows: '%d Record Selezionati'
            }
        },
        columns: _this.dtColumnsUtenti,
        buttons: _this.dtButtonsUtenti,
        ajax: {
            "url": "/Handler/AmministrazioneHandler.php?action=getListaUtenti",
            "cache": false,
            "dataSrc": function (json) {
                hideGlobalLoading();
                return json.data;
            }
        }
    });

};

Administrator.prototype.refreshTableUtenti = function () {
    var _this = this;

    var url = "/Handler/AmministrazioneHandler.php?action=getListaUtenti";
    _this.tableUtenti.clear().draw();
    $('#tableUtenti').DataTable().ajax.url(url);
    $('#tableUtenti').DataTable().ajax.reload(null, true);
    _this.tableUtenti = $('#tableUtenti').DataTable();

};


// PARTE CONTROLLI DATATABLE UTENTI
Administrator.prototype.initDtButtonUtenti = function () {
    var _this = this;
    
    _this.dtButtonMapUtenti = {};
    _this.dtButtonsUtenti = [];
    var i = 0;

    _this.dtButtonsUtenti.push(
        {
            enabled: false,
            text: " <i class='fa fa-users'></i> Testo",
            action: function (e, dt, node, config) {
                _this.funzione(_this.tableUtenti.row({ selected: true }).id(), _this.tableUtenti.row({ selected: true }).data().nome);
            }
        }
    );
    _this.dtButtonMapUtenti.NOME_BOTTONE = ++i;

};

Administrator.prototype.initDtColumnsUtenti = function () {
    var _this = this;

    var dtColHtml =
        '<tr>' +
        '<th><label>id</label></th>' +
        '</tr>';

    $('#tableUtenti thead').html(dtColHtml);
    $('#tableUtenti tfoot').html(dtColHtml);

    _this.dtColumnMapUtenti = {};
    _this.dtColumnsUtenti = [];
    var i = 0;

    _this.dtColumnsUtenti.push({ data: "id" });
    _this.dtColumnMapUtenti.NOMINATIVO = ++i;

};

Administrator.prototype.getDtButtonIndexUtenti = function (key) {
    var _this = this;
    var index = _this.dtButtonMapUtenti[key];
    return index === undefined ? -1 : index;
};

Administrator.prototype.enableDisableDtButtonUtenti = function (key, table, enabled) {
    var _this = this;
    var index = _this.getDtButtonIndexUtenti(key);
    if (index != -1)
        table.button(index).enable(enabled);
};

Administrator.prototype.getDtColumnIndexUtenti = function (key) {
    var _this = this;
    var index = _this.dtColumnMapUtenti[key];
    return index === undefined ? -1 : index;
};




// PARTE TAB PROFILI
Administrator.prototype.initTabProfili = function () {
    var _this = this;
};




// PARTE CONTROLLI DATATABLE PROFILI
Administrator.prototype.initDtButtonProfili = function () {
    var _this = this;
    
    _this.dtButtonMapProfili = {};
    _this.dtButtonsProfili = [];
    var i = 0;

    _this.dtButtonsProfili.push(
        {
            enabled: false,
            text: " <i class='fa fa-users'></i> Testo",
            action: function (e, dt, node, config) {
                _this.nomeFunzione(_this.tableProfili.row({ selected: true }).id(), _this.tableProfili.row({ selected: true }).data().nome);
            }
        }
    );
    _this.dtButtonMapProfili.NOME_BOTTONE = ++i;

};

Administrator.prototype.initDtColumnsProfili = function () {
    var _this = this;

    var dtColHtml =
        '<tr>' +
        '<th><label>id</label></th>' +
        '</tr>';

    $('#tableProfili thead').html(dtColHtml);
    $('#tableProfili tfoot').html(dtColHtml);

    _this.dtColumnsProfili = [];
    var dtColumnMapProfili = {};
    var i = 0;

    _this.dtColumnsProfili.push({ data: "id" });
    dtColumnMapProfili.NOMINATIVO = ++i;

    _this.dtColumnMapProfili = dtColumnMapProfili;

};

Administrator.prototype.getDtButtonIndexProfili = function (key) {
    var _this = this;
    var index = _this.dtButtonMapProfili[key];
    return index === undefined ? -1 : index;
};

Administrator.prototype.enableDisableDtButtonProfili = function (key, table, enabled) {
    var _this = this;
    var index = _this.getDtButtonIndexProfili(key);
    if (index != -1)
        table.button(index).enable(enabled);
};

Administrator.prototype.getDtColumnIndexProfili = function (key) {
    var _this = this;
    var index = _this.dtColumnMapProfili[key];
    return index === undefined ? -1 : index;
};




// PARTE TAB PERMESSI
Administrator.prototype.initTabPermessi = function () {
    var _this = this;
};



// PARTE CONTROLLI DATATABLE PERMESSI
Administrator.prototype.initDtButtonPermessi = function () {
    var _this = this;
    
    _this.dtButtonMapPermessi = {};
    _this.dtButtonsPermessi = [];
    var i = 0;

    _this.dtButtonsPermessi.push(
        {
            enabled: false,
            text: " <i class='fa fa-users'></i> Testo",
            action: function (e, dt, node, config) {
                _this.nomeFunzione(_this.tablePermessi.row({ selected: true }).id(), _this.tablePermessi.row({ selected: true }).data().nome);
            }
        }
    );
    _this.dtButtonMapPermessi.NOME_BOTTONE = ++i;

};

Administrator.prototype.initDtColumnsPermessi = function () {
    var _this = this;

    var dtColHtml =
        '<tr>' +
        '<th><label>id</label></th>' +
        '</tr>';

    $('#tablePermessi thead').html(dtColHtml);
    $('#tablePermessi tfoot').html(dtColHtml);

    _this.dtColumnsPermessi = [];
    var dtColumnMapPermessi = {};
    var i = 0;

    _this.dtColumnsPermessi.push({ data: "id" });
    dtColumnMapPermessi.NOMINATIVO = ++i;

    _this.dtColumnMapPermessi = dtColumnMapPermessi;

};

Administrator.prototype.getDtButtonIndexPermessi = function (key) {
    var _this = this;
    var index = _this.dtButtonMapPermessi[key];
    return index === undefined ? -1 : index;
};

Administrator.prototype.enableDisableDtButtonPermessi = function (key, table, enabled) {
    var _this = this;
    var index = _this.getDtButtonIndexPermessi(key);
    if (index != -1)
        table.button(index).enable(enabled);
};

Administrator.prototype.getDtColumnIndexPermessi = function (key) {
    var _this = this;
    var index = _this.dtColumnMapPermessi[key];
    return index === undefined ? -1 : index;
};


