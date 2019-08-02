/*
Author: Tu Hoang
ESRGC 2013
Store
geocodeProgress.js

handles request to check status of geocoding process

*/

ESRGC.Store.GeocodeProgress = ESRGC.Class({
    name: 'GeocodeProgress',
    url: 'CheckStatus',
    errorCallback: function () {
        log('error checking status');
    }
}, ESRGC.Store.Base);