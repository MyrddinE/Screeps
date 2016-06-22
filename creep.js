"use strict";

var G = require('game');
var M = require('shared');

/**
 * Creep state status types.
 * @enum {number}
 * @readonly
 */
this.CSE = {
    SUCCESS: 0,
    WORKING: 1,
    DELAYED: 2,
    FAIL_OTHER: 16,
    FAIL_BLOCKED: 17,
    FAIL_ENEMY_PRESENCE: 18,
    FAIL_DAMAGED: 19,
    ERR_OTHER: 32,
    ERR_MEMORY_INVALID: 33,
    ERR_CREEP_INVALID: 34
};

/**
 * Room object types.
 * @enum {string}
 * @readonly
 */
this.ROE = {
    CREEP: 'creep',
    STRUCTURE: 'structure',
    TERRAIN: 'terrain',
    FLAG: 'flag'
};

/*
 If there is something blocking me, examine it.
 If the blockage is a friendly creep, we are delayed.
 Increment the delay counter.
 If the counter > the goal urgency then calculate a new path.
 Return cseRecalculate a new path <= PGH
 Otherwise wait for the path to clear.
 Return CS_DELAYED
 End
 Otherwise if the blockage is a structure, we need to re-evaluate if we even want to continue to this goal..
 ClearSavedPath
 Return CS_FAIL_BLOCKED
 Otherwise if the blockage is an enemy, we need to run away screaming.
 ClearSavedPath
 Return CS_FAIL_ENEMY_PRESENCE
 End
 Otherwise I may have no movement parts.
 ClearSavedPath
 Return CS_FAIL_DAMAGED
 End
 The only way to get here is to encounter an unhandled failure method.
 ClearSavedPath
 Return CS_FAIL_OTHER
 End
 Otherwise create a new path.
 Return cseRecalculate a new path <= PGH
 End
 */

/**
 * Process one tick of the creep state Move.
 *
 * @param {object} hOptions - Contains the options object.
 * @returns {CSE} - Whether the move was successful, and how so, this tick.
 * @function
 */
Creep.prototype.CseMove = function(hOptions) {
    var ph, rxya, rxyFirst, pgh;

    // Is there a stored path?
    if (this.mh.ph && bSimilar_obj_a(this.mh.ph, ['path', 'ops', 'fl'])) {
        ph = this.mh.ph;
        rxyFirst = ph.path[0];

        if (this.rxy.bEquals_rxy(rxyFirst)) {
            // If I am on the first point, the last move was successful.

            // Pop the first step.
            ph.path.shift();
            rxyFirst = ph.path[0];

            // Is the new first step a Position object?
            if (bSimilar_obj_a(rxyFirst,this.rxy)) {
                // Move to the new first step.
                var v = this.vMove_de(this.deFrom_rxy(rxyFirst));
                if (OK == v || ERR_TIRED == v) {
                    // Either the move succeeded, or I'm still resting from the last move.

                    // Memorize the current fatigue level, so know if I failed to move due to fatigue next round.
                    ph.f = this.f;
                    return CSE.WORKING;
                } else {
                    // The creep is damaged or has no MOVE parts. Or it's not my creep.
                    return CSE.ERR_CREEP_INVALID;
                }
            } else if (bSimilar_obj_a(rxyFirst,['pos', 'range', 'bid', 'flid'])) {
                // If it's a Goal object, we've reached our destination.
                this.ClearPath();
                return CSE.SUCCESS;
            } else {
                // The path contains something other than RXY and PGH objects.
                return CSE.ERR_MEMORY_INVALID;
            }
        } else {
            // Otherwise movement failed last turn.

            if (ph.f > 0) {
                // I failed to move due to fatigue. Nothing wrong, try again.

                // FIXME Duplication
                var v = this.vMove_de(this.deFrom_rxy(rxyFirst));
                if (OK == v || ERR_TIRED == v) {
                    // Either the move succeeded, or I'm still resting from the last move.

                    // Memorize the current fatigue level, so know if I failed to move due to fatigue next round.
                    ph.f = this.f;
                    return CSE.WORKING;
                } else {
                    // The creep is damaged or has no MOVE parts. Or it's not my creep.
                    return CSE.ERR_CREEP_INVALID;
                }
            } else {
                // Look at the point I tried to move into.
                let aLook = this.r.aLook_rxy(rxyFirst);

                aLook.map(function(o) {
                    switch (o.type) {
                        case 'creep': return 1; break;
                        case 'structure':
                            if (STRUCTURE_ROAD == o.structure.e || STRUCTURE_CONTAINER == o.structure.e || STRUCTURE_RAMPART == o.structure.e && o.structure.obMine) {
                                return 0
                            } else {
                                return 2
                            }
                            break;
                        case 'terrain':
                            if ('wall' == o.terrain) {
                                return 4
                            }
                            break;
                        default: return 8; break;
                    }
                }).reduce(function(prev, next) {

                })
            }
        }
    }
};

Creep.prototype.cseRenew_h = function(hOptions) {
    // Renew
};

Creep.prototype.cseRecycle_h = function(hOptions) {
    // Sacrifice
};

Creep.prototype.cseDeconstruct_h = function(hOptions) {
    // Deconstruct
};

Creep.prototype.cseAttack_h = function(hOptions) {
    // Attack
};

Creep.prototype.csePickup_h = function(hOptions) {
    // Pickup
};

Creep.prototype.cseDropoff_h = function(hOptions) {
    // Dropoff
};

Creep.prototype.cseRepair_h = function(hOptions) {
    // Repair
};

Creep.prototype.cseGather_h = function(hOptions) {
    // Gather
};

Creep.prototype.cseWait_h = function(hOptions) {
    // Wait
};

// Creep
Object.defineProperty(Creep.prototype, 'bha', {get: function () {return this.body}});
Object.defineProperty(Creep.prototype, 'bea', {get: function () {return this.body.map(function(h) {return h.type})}});
Object.defineProperty(Creep.prototype, 'gq', {get: function () {return gqFrom_cbea(this.bea)}});
Object.defineProperty(Creep.prototype, 'ch', {get: function () {return this.carry}});
Object.defineProperty(Creep.prototype, 'cq', {get: function () {return _.sum(this.carry)}});
Object.defineProperty(Creep.prototype, 'cqFree', {get: function () {return this.carryCapacity - _.sum(this.carry)}});
Object.defineProperty(Creep.prototype, 'cqx', {get: function () {return this.carryCapacity}});
Object.defineProperty(Creep.prototype, 'yq', {get: function () {return this.carry[RESOURCE_ENERGY]}});
Object.defineProperty(Creep.prototype, 'yqAvailable', {get: function () {return this.yq}});
Object.defineProperty(Creep.prototype, 'yqFree', {get: function () {return this.carryCapacity - _.sum(this.carry)}});
Object.defineProperty(Creep.prototype, 'yqx', {get: function () {return this.yq + this.yqFree}});
Object.defineProperty(Creep.prototype, 'h', {get: function () {return this.hits}});
Object.defineProperty(Creep.prototype, 'hx', {get: function () {return this.hitsMax}});
Object.defineProperty(Creep.prototype, 'f', {get: function () {return this.fatigue}});
Object.defineProperty(Creep.prototype, 'obMine', {get: function () {return this.my}});
Object.defineProperty(Creep.prototype, 'oh', {get: function () {return this.owner}});
Object.defineProperty(Creep.prototype, 'bSpawning', {get: function () {return this.spawning}});
Object.defineProperty(Creep.prototype, 'ktl', {get: function () {return this.ticksToLive}});
Object.defineProperty(Creep.prototype, 'gt', {get: function () {return Math.ceil(this.gq / 3 / this.bea.length)/ Math.floor(500/this.bea.length)}});
Creep.prototype.vAttack_t = function(tTarget) {return this.attack(tTarget)};
Creep.prototype.vAttack_ll = function(llController) {return this.attackController(llController)};
Creep.prototype.vBuild_o = function(oConstructionSite) {return this.build(oConstructionSite)};
Creep.prototype.vCancel_cfunc = function(cfuncOrder) {return this.cancelOrder(cfuncOrder)};
Creep.prototype.vClaim_ll = function(llController) {return this.claimController(llController)};
Creep.prototype.vDismantle_b = function(bBuilding) {return this.dismantle(bBuilding)};
Creep.prototype.vDrop_rmge_q = function(rmgeResource,qQuantity) {return this.dismantle(rmgeResource,qQuantity)};
Creep.prototype.cbqActive_cbe = function(cbeBodypartType) {return this.getActiveBodyparts(cbeBodypartType)};
Creep.prototype.vHarvest_n = function(nNode) {return this.harvest(nNode)};
Creep.prototype.vHeal_c = function(cCreep) {return this.heal(cCreep)};
Object.defineProperty(Creep.prototype, 'mh', {
    get: function () {return this.memory},
    set: function (value) {this.memory = value}
});
Creep.prototype.vMove_de = function(deDirection) {return this.move(deDirection)};
Creep.prototype.vFollow_pa = function(paPath) {return this.moveByPath(paPath)};
Creep.prototype.vFollow_pz = function(pzPath) {return this.moveByPath(pzPath)};
Creep.prototype.vMove_rxy_h = function(rxyDestination, hOptions) {return this.moveTo(rxyDestination, hOptions)};
Creep.prototype.vMove_rxy = function(rxyDestination) {return this.moveTo(rxyDestination, {reusePath: 10, noPathFinding: Game.cpu.bucket < 100})};
Creep.prototype.vAttackNotification_b = function(b) {return this.notifyWhenAttacked(b)};
Creep.prototype.vPickup_rmg = function(rmg) {return this.pickup(rmg)};
Creep.prototype.vAttackRanged_t = function(tEnemy) {return this.rangedAttack(tEnemy)};
Creep.prototype.vHealRanged_c = function(cCreep) {return this.rangedHeal(cCreep)};
Creep.prototype.vAttackRanged = function() {return this.rangedMassAttack()};
Creep.prototype.vRepair_b = function(bBuilding) {return this.repair(bBuilding)};
Creep.prototype.vReserve_ll = function(llController) {return this.reserveController(llController)};
Creep.prototype.vLog_s = function(sString) {return this.say(sString)};
Creep.prototype.vDelete = function() {return this.suicide()};
Creep.prototype.vTransfer_t_rmg_q = function(tTarget, rmgResource, qQuantity) {return this.transfer(tTarget, rmgResource, qQuantity)};
Creep.prototype.vTransfer_t_rmg = function(tTarget, rmgResource) {return this.transfer(tTarget, rmgResource)};
Creep.prototype.vTransferY_t_q = function(tTarget, qQuantity) {return this.transfer(tTarget, RESOURCE_ENERGY, qQuantity)};
Creep.prototype.vTransferY_t = function(tTarget) {return this.transfer(tTarget, RESOURCE_ENERGY)};
Creep.prototype.vUpgrade_ll = function(llController) {return this.upgradeController(llController)};


Creep.prototype.ClearPath = function() {
    if (this.mh.ph) {
        if (this.mh.ph.flid) {G.objFrom_id(this.mh.ph.flid).vDelete}
        if (this.mh.ph.pgh.flid) {G.objFrom_id(this.mh.ph.flid).vDelete}
        delete Memory.creeps[this.name].ph
    }
};







module.exports = {
    vCreate_cb_w_p: 
        function (cb = null, w = Game.spawns.Home, p = 10) {
            var wgx = w.memory.gx;
            var cbd = {};
            cbd[MOVE] = {n: 1, p: 0.35};
            cbd[WORK] = {n: 1, p: 0.25};
            cbd[CARRY] = {n: 1, p: 0.40};

            cb = cb ? cb : M.cbGenerate_cbd_g(cbd, wgx);
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
    'CSEA': CSEA
};

