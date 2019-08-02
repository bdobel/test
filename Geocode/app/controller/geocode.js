/*
Author: Tu Hoang
ESRGC 2013

Desktop browser

Controller
geocode controller 
(implemented based on JQuery)

options: 
refs: object contains of references 
control: object of handlers

*/

ESRGC.Controller.Geocode = ESRGC.Class({
    name: 'Geocode',
    pollKey: null,
    refs: {
        geocodeBtn: '#startGeocodeBtn',
        contentDiv: '#content',
        statusControlDiv: '#statusControl',
        progressDiv: '#progress',
        progressBar: 'div.progress .bar',
        cancelBtn: '#cancelBtn'
    },
    control: {
        geocodeBtn: {
            click: 'onGeocodeBtnClick'
        }
        
    },
    init: function () {
        var scope = this;
        var store = ESRGC.getStore('Geocode');
        if (typeof store != 'undefined')
            store.on('load', this.onGeocodeStoreLoad);
        var progressStore = ESRGC.getStore('GeocodeProgress');
        if (typeof progressStore != 'undefined') {
            progressStore.on('load', this.onGeocodeStoreProgressLoad);
            //set polling
            scope.pollKey = setInterval(function () {
                log('Fetching progress..');
                progressStore.loadJson('post');
            }, 5000); //refresh every 5 seconds
        }
    },
    /*store event handlers*/
    onGeocodeStoreLoad: function (store, data) {
        var scope = ESRGC.getController('Geocode');
        //stop polling
        clearInterval(scope.pollKey);
        //update dataview
        var contentDiv = scope.getContentDiv();
        contentDivHtml = data;
        contentDiv.html(contentDivHtml);
    },
    onGeocodeStoreProgressLoad: function (store, data) {
        log('status fetched from server');
        var scope = ESRGC.getController('Geocode');
        var progressDiv = scope.getProgressDiv();
        var progressBar = scope.getProgressBar();
        var message = data.message;
        if (typeof message != 'undefined')
            progressDiv.text(message);
        var progress = data.progress;
        if (typeof progress != 'undefined')
            progressBar.css('width', progress + '%');
    },
    onGeocodeErrorOccured: function () {

    },
    /*UI event handlers*/
    onGeocodeBtnClick: function (event, object) {
        var scope = ESRGC.getController('Geocode');
        $(object).attr('disabled', 'disabled');
        var div = scope.getStatusControlDiv();
        var divHtml = '<div id="ajaxLoadingHtml" class="row-fluid"><div style=" margin:auto;"><span><img src="resources/images/ajax-loader.gif" style="padding: 10px;"><strong>Geocoding! Please wait...Do not refresh the browser or navigate out of this page.</strong></span></div></div>'
        div.append(divHtml);

        var store = ESRGC.getStore('Geocode');
        store.loadContent('post');

        scope.getProgressBar().parent().removeClass('hide'); //show progress bar
        scope.getCancelBtn().removeClass('hide');
    }
}, ESRGC.Controller.Base);