"use strict";

var G = {};

// Cannot modify Game object, so create global G object copy.
Object.defineProperty(G, 'cpuh', {get: function () {
    return {tq: Game.cpu.limit, tqx: Game.cpu.tickLimit, qx: Game.cpu.bucket}
}});
Object.defineProperty(G, 'ch', {get: function () {return Game.creeps}});
Object.defineProperty(G, 'flh', {get: function () {return Game.flags}});
Object.defineProperty(G, 'gclh', {get: function () {
    return {q: Game.gcl.level, yq: Game.gcl.progress, yqx: Game.gcl.progressTotal}
}});
Object.defineProperty(G, 'map', {get: function () {return Game.map}});
Object.defineProperty(G, 'mkt', {get: function () {return Game.market}});
Object.defineProperty(G, 'rh', {get: function () {return Game.rooms}});
Object.defineProperty(G, 'wh', {get: function () {return Game.spawns}});
Object.defineProperty(G, 'bh', {get: function () {return Game.structures}});
Object.defineProperty(G, 'tq', {get: function () {return Game.time}});
G.cpuq = function () {return Game.getUsed()};
G.objFrom_id = function (id) {return Game.getObjectById(id)};
G.Email_s_q = function (sMessage, qMinutes) {Game.notify(sMessage, qMinutes)};

module.exports = G;