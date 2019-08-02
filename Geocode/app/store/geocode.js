/*
Author: Tu Hoang
ESRGC 2013
Store
geocode.js

handles request to start geocoding process

*/

ESRGC.Store.Geocode = ESRGC.Class({
    name: 'Geocode',
    url: 'Geocode',
    init: function () {
        $.ajaxSetup({
            timeout: 7200000
        });
        log('Ajax timeout is set to 2 hours!');
    },
    errorCallback: function () {
        log('Error might have occured. Operation stopped');
        //call controller function to handle UI
        var controller = ESRGC.getController('Geocode');
        if (typeof controller.onGeocodeErrorOccured == 'function')
            controller.onGeocodeErrorOccured();
    }
}, ESRGC.Store.Base);