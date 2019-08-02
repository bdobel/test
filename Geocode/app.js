/*
Author: Tu Hoang
ESRGC 2013

app.js geocode

Controls upload
*/

ESRGC.App = ESRGC.Class({
    name: "Geocode",
    controllers: ['Geocode'],
    views: [],
    stores: ['Geocode', 'GeocodeProgress'],
    initialize: function (options) {
        ESRGC.Application.prototype.initialize.call(this, arguments);
    }
}, ESRGC.Application);
