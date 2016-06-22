"use strict";



// Room
Object.defineProperty(Room.prototype, 'gt'    , {get: function () {
    return this.find(FIND_STRUCTURES).map(function(o) {return o.gt    }).reduce(function(total, gt    ) {return gt     ? total + gt     : total}) + this.find(FIND_MY_CREEPS).map(function(c) {return c.gt    }).reduce(function(total, gt    ) {return total + gt    })
}});
Object.defineProperty(Room.prototype, 'yq'    , {get: function () {
    return this.find(FIND_STRUCTURES).map(function(o) {return o.yq    }).reduce(function(total, yq    ) {return yq     ? total + yq     : total}) + this.find(FIND_MY_CREEPS).map(function(c) {return c.yq    }).reduce(function(total, yq    ) {return total + yq    })
}});
Object.defineProperty(Room.prototype, 'yqFree', {get: function () {
    return this.find(FIND_STRUCTURES).map(function(o) {return o.yqFree}).reduce(function(total, yqFree) {return yqFree ? total + yqFree : total}) + this.find(FIND_MY_CREEPS).map(function(c) {return c.yqFree}).reduce(function(total, yqFree) {return total + yqFree})
}});
Object.defineProperty(Room.prototype, 'yqx'   , {get: function () {
    return this.find(FIND_STRUCTURES).map(function(o) {return o.yqx   }).reduce(function(total, yqx   ) {return yqx    ? total + yqx    : total}) + this.find(FIND_MY_CREEPS).map(function(c) {return c.yqx   }).reduce(function(total, yqx   ) {return total + yqx   })
}});
Object.defineProperty(Room.prototype, 'll', {get: function () {return this.controller}});
Object.defineProperty(Room.prototype, 'wyq', {get: function () {return this.energyAvailable}});
Object.defineProperty(Room.prototype, 'wyqx', {get: function () {return this.energyCapacityAvailable}});
Object.defineProperty(Room.prototype, 'mh', {
    get: function () {return this.memory},
    set: function (value) {this.memory = value}
});
Object.defineProperty(Room.prototype, 'modee', {get: function () {return this.mode}});
Object.defineProperty(Room.prototype, 'bs', {get: function () {return this.storage}});
Object.defineProperty(Room.prototype, 'bm', {get: function () {return this.terminal}});
Room.prototype.pzFrom_pa = function(pa) {return this.serializePath(pa)};
Room.prototype.paFrom_pz = function(pz) {return this.deserializePath(pz)};
Room.prototype.vBuild_rxy_be = function(rxyPosition, beBuildingType) {return this.createConstructionSite(rxyPosition, beBuildingType)};
Room.prototype.vBuild_rx_ry_be = function(rx, ry, beBuildingType) {return this.createConstructionSite(rx, ry, beBuildingType)};
Room.prototype.vFlag_rx_ry_name_flce_flce = function(rx, ry, name, flcePrimary, flceSecondary) {return this.createFlag(rx, ry, name, flcePrimary, flceSecondary)};
Room.prototype.vFlag_rx_ry_name_flce = function(rx, ry, name, flcePrimary) {return this.createFlag(rx, ry, name, flcePrimary)};
Room.prototype.vFlag_rx_ry_name = function(rx, ry, name) {return this.createFlag(rx, ry, name)};
Room.prototype.vFlag_rx_ry_flce_flce = function(rx, ry, flcePrimary, flceSecondary) {return this.createFlag(rx, ry, null, flcePrimary, flceSecondary)};
Room.prototype.vFlag_rx_ry_flce = function(rx, ry, flcePrimary) {return this.createFlag(rx, ry, null, flcePrimary)};
Room.prototype.vFlag_rx_ry = function(rx, ry) {return this.createFlag(rx, ry)};
Room.prototype.vFlag_rxy_name_flce_flce = function(rxy, name, flcePrimary, flceSecondary) {return this.createFlag(rxy, name, flcePrimary, flceSecondary)};
Room.prototype.vFlag_rxy_name_flce = function(rxy, name, flcePrimary) {return this.createFlag(rxy, name, flcePrimary)};
Room.prototype.vFlag_rxy_name = function(rxy, name) {return this.createFlag(rxy, name)};
Room.prototype.vFlag_rxy_flce_flce = function(rxy, flcePrimary, flceSecondary) {return this.createFlag(rxy, null, flcePrimary, flceSecondary)};
Room.prototype.vFlag_rxy_flce = function(rxy, flcePrimary) {return this.createFlag(rxy, null, flcePrimary)};
Room.prototype.vFlag_rxy = function(rxy) {return this.createFlag(rxy)};
Room.prototype.aFind_finde_h = function(lookeType, hFilter) {return this.find(lookeType, hFilter)};
Room.prototype.aFind_finde = function(lookeType) {return this.find(lookeType)};
Room.prototype.reWorldPath_r = function(r) {return this.findExitTo(r)};
Room.prototype.paFrom_rxy_rxy_h = function(rxyFrom, rxyTo, hOptions) {return this.findPath(rxyFrom, rxyTo, hOptions)};
Room.prototype.paFrom_rxy_rxy = function(rxyFrom, rxyTo) {return this.findPath(rxyFrom, rxyTo)};
Room.prototype.rxyFrom_rx_ry = function(rx, ry) {return this.getPositionAt(rx, ry)};
Room.prototype.aLook_rx_ry = function(pa) {return this.lookAt(pa)};
Room.prototype.aLook_rxy = function(pa) {return this.lookAt(pa)};
Room.prototype.hhaLook_ryn_rxn_ryx_rxx = function(ryn, rxn, ryx, rxx) {return this.lookAtArea(ryn, rxn, ryx, rxx)};
Room.prototype.aLook_looke_rx_ry = function(lookeType, rx, ry) {return this.lookForAt(lookeType, rx, ry)};
Room.prototype.aLook_looke_rxy = function(lookeType, rxy) {return this.lookForAt(lookeType, rxy)};
Room.prototype.hhaLook_looke_ryn_rxn_ryx_rxx = function(lookeType, ryn, rxn, ryx, rxx) {return this.lookForAtArea(lookeType, ryn, rxn, ryx, rxx)};

// RoomObject
Object.defineProperty(RoomObject.prototype, 'rxy', {get: function () {return this.pos}});
Object.defineProperty(RoomObject.prototype, 'r', {get: function () {return this.room}});

// Structure
Object.defineProperty(Structure.prototype, 'hq', {get: function () {return this.hits}});
Object.defineProperty(Structure.prototype, 'hqx', {get: function () {return this.hitsMax}});
Object.defineProperty(Structure.prototype, 'e', {get: function () {return this.structureType}});
Structure.prototype.vDelete = function() {return this.destroy()};
Structure.prototype.bActive = function() {return this.isActive()};
Structure.prototype.vEmail_b = function(bEnabled) {return this.notifyWhenAttacked(bEnabled)};

// OwnedStructure
Object.defineProperty(OwnedStructure.prototype, 'oh', {get: function () {return this.owner}});
Object.defineProperty(OwnedStructure.prototype, 'obMine', {get: function () {return this.my}});

// StructureContainer
Object.defineProperty(StructureContainer.prototype, 'ch', {get: function () {return this.store}});
Object.defineProperty(StructureContainer.prototype, 'cq', {get: function () {return _.sum(this.store)}});
Object.defineProperty(StructureContainer.prototype, 'cqFree', {get: function () {return this.storeCapacity - _.sum(this.store)}});
Object.defineProperty(StructureContainer.prototype, 'cqx', {get: function () {return this.storeCapacity}});
Object.defineProperty(StructureContainer.prototype, 'yq', {get: function () {return this.store[RESOURCE_ENERGY]}});
Object.defineProperty(StructureContainer.prototype, 'yqFree', {get: function () {return this.storeCapacity - _.sum(this.store)}});
Object.defineProperty(StructureContainer.prototype, 'yqx', {get: function () {return this.yq + this.yqFree}});
Object.defineProperty(StructureContainer.prototype, 'gt', {get: function () {return 50/500}});
StructureContainer.prototype.vTransfer_c_rmge_q = function(cCreep, rmgeResourceType, qQuantity) {return this.transfer(cCreep, rmgeResourceType, qQuantity)};
StructureContainer.prototype.vTransferY_c_q = function(cCreep, qQuantity) {return this.transfer(cCreep, RESOURCE_ENERGY, qQuantity)};

// StructureExtension
Object.defineProperty(StructureExtension.prototype, 'yq', {get: function () {return this.energy}});
Object.defineProperty(StructureExtension.prototype, 'yqFree', {get: function () {return this.energyCapacity - this.energy}});
Object.defineProperty(StructureExtension.prototype, 'yqx', {get: function () {return this.energyCapacity}});
StructureExtension.prototype.vTransferY_c_q = function(cCreep, qQuantity) {return this.transferEnergy(cCreep, qQuantity)};
StructureExtension.prototype.vTransfer_c_rmge_q = function(cCreep, rmgeResourceType, qQuantity) {
    if(rmgeResourceType == RESOURCE_ENERGY) {return this.transferEnergy(cCreep, qQuantity)} else {return ERR_INVALID_ARGS}
};

// StructureSpawn
Object.defineProperty(StructureSpawn.prototype, 'yq', {get: function () {return this.energy}});
Object.defineProperty(StructureSpawn.prototype, 'yqFree', {get: function () {return this.energyCapacity - this.energy}});
Object.defineProperty(StructureSpawn.prototype, 'yqx', {get: function () {return this.energyCapacity}});
Object.defineProperty(StructureSpawn.prototype, 'mh', {
    get: function () {return this.memory},
    set: function (value) {this.memory = value}
});
Object.defineProperty(StructureSpawn.prototype, 'hSpawning', {get: function () {return this.spawning}});
StructureSpawn.prototype.vTestCreate_cba_name = function(cbaBody, name) {return this.canCreateCreep(cbaBody, name)};
StructureSpawn.prototype.vTestCreate_cba = function(cbaBody) {return this.canCreateCreep(cbaBody)};
StructureSpawn.prototype.vCreate_cba_name_mh = function(cbaBody, name, mhMemory) {return this.createCreep(cbaBody, name, mhMemory)};
StructureSpawn.prototype.vCreate_cba_name = function(cbaBody, name) {return this.createCreep(cbaBody, name)};
StructureSpawn.prototype.vCreate_cba_mh = function(cbaBody, mhMemory) {return this.createCreep(cbaBody, null, mhMemory)};
StructureSpawn.prototype.vCreate_cba = function(cbaBody) {return this.createCreep(cbaBody)};
StructureSpawn.prototype.vRecycle_c = function(cCreep) {return this.recycleCreep(cCreep)};
StructureSpawn.prototype.vRenew_c = function(cCreep) {return this.renewCreep(cCreep)};
StructureSpawn.prototype.vTransferY_c_q = function(cCreep, qQuantity) {return this.transferEnergy(cCreep, qQuantity)};
StructureSpawn.prototype.vTransferY_c = function(cCreep) {return this.transferEnergy(cCreep)};
StructureSpawn.prototype.vTransfer_c_rmge_q = function(cCreep, rmgeResourceType, qQuantity) {
    if(rmgeResourceType == RESOURCE_ENERGY) {return this.transferEnergy(cCreep, qQuantity)} else {return ERR_INVALID_ARGS}
};
StructureSpawn.prototype.vTransfer_c_rmge = function(cCreep, rmgeResourceType) {
    if(rmgeResourceType == RESOURCE_ENERGY) {return this.transferEnergy(cCreep)} else {return ERR_INVALID_ARGS}
};

// StructureTower
Object.defineProperty(StructureTower.prototype, 'yq', {get: function () {return this.energy}});
Object.defineProperty(StructureTower.prototype, 'yqFree', {get: function () {return this.energyCapacity - this.energy}});
Object.defineProperty(StructureTower.prototype, 'yqx', {get: function () {return this.energyCapacity}});
StructureTower.prototype.vAttack_c = function(cEnemy) {return this.attack(cEnemy)};
StructureTower.prototype.vHeal_c = function(cCreep) {return this.heal(cCreep)};
StructureTower.prototype.vRepair_b = function(bBuilding) {return this.repair(bBuilding)};
StructureTower.prototype.vTransferY_c_q = function(cCreep, qQuantity) {return this.transferEnergy(cCreep, qQuantity)};
StructureTower.prototype.vTransferY_c = function(cCreep) {return this.transferEnergy(cCreep)};
StructureTower.prototype.vTransfer_c_rmge_q = function(cCreep, rmgeResourceType, qQuantity) {
    if(rmgeResourceType == RESOURCE_ENERGY) {return this.transferEnergy(cCreep, qQuantity)} else {return ERR_INVALID_ARGS}
};
StructureTower.prototype.vTransfer_c_rmge = function(cCreep, rmgeResourceType) {
    if(rmgeResourceType == RESOURCE_ENERGY) {return this.transferEnergy(cCreep)} else {return ERR_INVALID_ARGS}
};

// StructureRoad
Object.defineProperty(StructureRoad.prototype, 'tDecay', {get: function () {return this.ticksToDecay}});
Object.defineProperty(StructureRoad.prototype, 'ktl', {get: function () {return Math.floor(this.hq / 100) * 1000 + this.tDecay}});
Object.defineProperty(StructureRoad.prototype, 'gt', {get: function () {return 1/1000}});

// StructureRampart
Object.defineProperty(StructureRampart.prototype, 'tDecay', {get: function () {return this.ticksToDecay}});
Object.defineProperty(StructureRampart.prototype, 'ktl', {get: function () {return Math.floor(this.hq / 300) * 100 + this.tDecay}});
Object.defineProperty(StructureRampart.prototype, 'gt', {get: function () {return 3/100}});

// Resource
Object.defineProperty(Resource.prototype, 'cq', {get: function () {return this.amount}});
Object.defineProperty(Resource.prototype, 'cqFree', {get: function () {return 0}});
Object.defineProperty(Resource.prototype, 'cqx', {get: function () {return this.amount}});
Object.defineProperty(Resource.prototype, 'e', {get: function () {return this.resourceType}});
Object.defineProperty(Resource.prototype, 'yq', {get: function () {return this.e == RESOURCE_ENERGY ? this.amount : 0}});
Object.defineProperty(Resource.prototype, 'yqFree', {get: function () {return 0}});
Object.defineProperty(Resource.prototype, 'yqx', {get: function () {return this.yq}});


// ConstructionSite
Object.defineProperty(ConstructionSite.prototype, 'oh', {get: function () {return Game.owner}});
Object.defineProperty(ConstructionSite.prototype, 'obMine', {get: function () {return Game.my}});
Object.defineProperty(ConstructionSite.prototype, 'gq', {get: function () {return this.progress}});
Object.defineProperty(ConstructionSite.prototype, 'gqx', {get: function () {return this.progressTotal}});
Object.defineProperty(ConstructionSite.prototype, 'be', {get: function () {return this.structureType}});
ConstructionSite.prototype.vDelete = function() {return this.delete()};

// Creep
Object.defineProperty(Creep.prototype, 'bha', {get: function () {return this.body}});
Object.defineProperty(Creep.prototype, 'bea', {get: function () {return this.body.map(function(h) {return h.type})}});
Object.defineProperty(Creep.prototype, 'gq', {get: function () {return M.gqFrom_cbea(this.bea)}});
Object.defineProperty(Creep.prototype, 'ch', {get: function () {return this.carry}});
Object.defineProperty(Creep.prototype, 'cq', {get: function () {return _.sum(this.carry)}});
Object.defineProperty(Creep.prototype, 'cqFree', {get: function () {return this.carryCapacity - _.sum(this.carry)}});
Object.defineProperty(Creep.prototype, 'cqx', {get: function () {return this.carryCapacity}});
Object.defineProperty(Creep.prototype, 'yq', {get: function () {return this.carry[RESOURCE_ENERGY]}});
Object.defineProperty(Creep.prototype, 'yqFree', {get: function () {return this.carryCapacity - _.sum(this.carry)}});
Object.defineProperty(Creep.prototype, 'yqx', {get: function () {return this.yq + this.yqFree}});
Object.defineProperty(Creep.prototype, 'h', {get: function () {return this.hits}});
Object.defineProperty(Creep.prototype, 'hx', {get: function () {return this.hitsMax}});
Object.defineProperty(Creep.prototype, 'f', {get: function () {return this.fatigue}});
Object.defineProperty(Creep.prototype, 'obMine', {get: function () {return this.my}});
Object.defineProperty(Creep.prototype, 'oh', {get: function () {return this.owner}});
Object.defineProperty(Creep.prototype, 'bSpawning', {get: function () {return this.spawning}});
Object.defineProperty(Creep.prototype, 'ktl', {get: function () {return this.ticksToLive}});
Object.defineProperty(Creep.prototype, 'gt', {get: function () {return Math.ceil(this.gq / 3 / this.ba.length)/ Math.floor(500/this.bea.length)}});
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

// Flag
Object.defineProperty(Flag.prototype, 'flcePrimary', {
    get: function () {return this.color},
    set: function (value) {
        if (this.flcePrimary == this.flceSecondary) {
            this.setColor(value)
        } else {
            this.setColor(value, this.flceSecondary)
        }
    }
});
Object.defineProperty(Flag.prototype, 'flceSecondary', {
    get: function () {return this.secondaryColor},
    set: function (value) {this.setColor(this.color, value)}
});
Object.defineProperty(Flag.prototype, 'mh', {
    get: function () {return this.memory},
    set: function (value) {this.memory = value}
});
Flag.prototype.vDelete = function () {return this.remove()};
Flag.prototype.vRecolor_flce_flce = function (flcePrimary, flceSecondary) {return this.setColor(flcePrimary, flceSecondary)};
Flag.prototype.vRecolor_flce = function (flcePrimary) {return this.setColor(flcePrimary)};
Flag.prototype.vReposition_rxy = function (xyPosition) {return this.setPosition(xyPosition)};
Flag.prototype.vReposition_rx_ry = function (rx, ry) {return this.setPosition(rx, ry)};


// Mineral
Object.defineProperty(Mineral.prototype, 'q', {get: function () {return this.mineralAmount}});
Object.defineProperty(Mineral.prototype, 'qx', {get: function () {return MINERAL_MIN_AMOUNT[this.mineralType] * 2}});
Object.defineProperty(Mineral.prototype, 'e', {get: function () {return this.mineralType}});
Object.defineProperty(Mineral.prototype, 'tqRefill', {get: function () {return this.ticksToRegeneration}});

// Source
Object.defineProperty(Source.prototype, 'q', {get: function () {return this.energy}});
Object.defineProperty(Source.prototype, 'qx', {get: function () {return this.energyCapacity}});
Object.defineProperty(Source.prototype, 'e', {get: function () {return RESOURCE_ENERGY}});
Object.defineProperty(Source.prototype, 'tqRefill', {get: function () {return this.ticksToRegeneration}});

// PathFinder.CostMatrix
Object.defineProperty(PathFinder.CostMatrix.prototype, 'z', {get: function (pcm) {return this.serialize(pcm)}});