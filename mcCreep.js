var CR_NONE = 'none';
var CS_RENEW = 'renew';
var CS_RECYCLE = 'recycle';
var CS_ATTACK = 'attack';
var CS_PICKUP = 'pickup';
var CS_REPAIR = 'repair';
var CS_DROPOFF = 'dropoff';
var CS_GATHER = 'gather';
var CS_WAIT = 'wait';
var CS_MOVE = 'move';
var CSEA = [
    CS_RENEW,
    CS_RECYCLE,
    CS_ATTACK,
    CS_PICKUP,
    CS_REPAIR,
    CS_DROPOFF,
    CS_GATHER,
    CS_WAIT,
    CS_MOVE,
];

Creep.prototype.vCSRenew_h = function(hOptions) {
    // Renew
};

Creep.prototype.vCSRecycle_h = function(hOptions) {
    // Sacrifice
};

Creep.prototype.vCSAttack_h = function(hOptions) {
    // Attack
};

Creep.prototype.vCSPickup_h = function(hOptions) {
    // Pickup
};

Creep.prototype.vCSDropoff_h = function(hOptions) {
    // Dropoff
};

Creep.prototype.vCSRepair_h = function(hOptions) {
    // Repair
};

Creep.prototype.vCSGather_h = function(hOptions) {
    // Gather
};

Creep.prototype.vCSWait_h = function(hOptions) {
    // Wait
};

Creep.prototype.vCSMove_h = function(hOptions) {
    if (!this.mh.pghaz) {
        return ERR_INVALID_TARGET
    }
    var pgha = pghaFrom_pghaz(this.mh.pghaz);
    if (not(pgha && pgha.length > 0)) {
        return ERR_INVALID_TARGET
    }
    return this.vCSMove_pgha_h(pgha, hOptions);
};












module.exports = {
    vCreate_cb_w_p: 
        function (cb = null, w = Game.spawns.Home, p = 10) {
            var wgx = w.memory.gx;
            var cbd = {};
            cbd[MOVE] = {n: 1, p: 0.35};
            cbd[WORK] = {n: 1, p: 0.25};
            cbd[CARRY] = {n: 1, p: 0.40};

            cb = cb ? cb : m.cbGenerate_cbd_g(cbd, wgx);
            var memory = {};
            memory.role = ROLE;
            memory.state = STATE_REFUEL;
            memory.nearestSpawn = w.id;
        },
    'CR_NONE': CR_NONE,
    'CS_RENEW': CS_RENEW,
    'CS_RECYCLE': CS_RECYCLE,
    'CS_ATTACK': CS_ATTACK,
    'CS_PICKUP': CS_PICKUP,
    'CS_REPAIR': CS_REPAIR,
    'CS_DROPOFF': CS_DROPOFF,
    'CS_GATHER': CS_GATHER,
    'CS_WAIT': CS_WAIT,
};
