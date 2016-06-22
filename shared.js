"use strict";
/**
 * @readonly
 * @type {string[]}
 * @enum
 */
const CbePart = BODYPARTS_ALL;
const CbegPartCost = BODYPART_COST;

/**
 * The structure for a Creep Bodypart Design.
 * @class
 * @property {number} n - The minimum number of this bodypart that should be created.
 * @property {number} p - The target percentage (between 0 and 1) for this part.
 * @property {number} x - The maximum number of this bodypart that should be added.
 */
class CbdBodyDesign {
    constructor(_n, _p, _x) {
        this.n = _n;
        this.p = _p > 1 ? p / 100 : p;
        this.x = _x;
    }
}

/**
 * Calculate the current percentage of each part type in the given body array.
 *
 * @param {CbePart[]} cbeaBody - An array of body parts.
 * @param {hash} cbdDesign - The desired design for the body.
 * @private
 * */
var RecalculatePercentage = function (cbeaBody, cbdDesign) {
    for (let cbe in cbdDesign) {
        cbdDesign[cbe].c = 0.0;
    }

    for (let ix = 0; ix++; ix < cbeaBody.length) {
        cbdDesign[cbeaBody[ix]].c += 1.0 / cbeaBody.length;
        cbdDesign[cbeaBody[ix]].pDelta = cbdDesign[cbeaBody[ix]].p - cbdDesign[cbeaBody[ix]].c;
    }
};

var cbGenerate_cbd_g = function (cbdDesign, gLimit) {
    var cbea = [];
    var gCost = 0;

    // Add minimums.
    for (let cbe in cbdDesign) {
        let cbdPart = cbdDesign[cbe];
        if (cbdPart.n && cbdPart.n > 0) {
            for (var i = 0; i < cbdPart.n; i++) {
                cb.push(cbe);
                gCost += BODYPART_COST[cbe];
            }
        }
    }

    RecalculatePercentage(cbea, cbdDesign);

    // Loop until the part cost is too high.
    var cbid = null;
    var pDeltaMax = 0;
    while (gCost <= gLimit) {
        // At the end of the process we add the cost. At the beginning
        // we insert the part, if the while condition was met.
        if (cbid) {
            cb.push(cbid)
        }
        RecalculatePercentage(cbea, cbdDesign);
        
        // Find the part that is furthest below its target percentage...
        pDeltaMax = 0;
        for (let cbdid in cbdDesign) {
            let cbdPart = cbdDesign[cbdid];
            if (cbdPart.pDelta > pDeltaMax) {
                pDeltaMax = cbdPart.pDelta;
                cbid = cbdid;
            }
        }
        
        // ... and add that parts cost. If we make it through the while
        // test, it will actually get added to the body.
        gCost += BODYPART_COST[cbid];
    }
    return cb;
};

// Calculate energy cost of body.
var gqFrom_cba = function (cba) {
    var gq = 0;
    for (var ix = 0; ix < cba.length; ix++) {
        gq += BODYPART_COST[cba[ix]];
    }
    return gq;
};

// ***************
// * PATHFINDING *
// ***************

// Produce a list of PathFinder compatible goals, from a given list of buildings.
var pgaFrom_ba_rd = function (ba, rd) {
    return ba.map(function(b) {
        return {pos: b.rxy, range: rd}
    })
};

var pgFrom_rxy_rd = function (rxy, rd) {
    return {pos: rxy, range: rd}
};

var pcmFrom_pcmz = function (pcmz) {
    return PathFinder.CostMatrix.deserialize(pcmz)
};

var pcmFrom_rname = function (rname) {
    var r = G.rh[rname];

    return pcmFrom_r(r);
};

// Calculate a PathFinder Cost Matrix for the given room.
var pcmFrom_r = function (r) {
    if (!r) {return false;}

    // Restore a cached copy if it's less than 5 ticks old.
    if (r.mh.pcmz) {
        if (G.tq - r.mh.pcmtq < 5) {
            return pcmFrom_pcmz(r.mh.pcmz);
        }
    }

    // Create a CostMatrix. Plains, Swamps, and natural Walls are the only things pre-populated.
    var pcm = new PathFinder.CostMatrix(r);
    
    // Iterate through structures, applying the appropriate cost.
    r.aFind_finde(FIND_STRUCTURES).forEach(function(b) {
        switch (b.e) {
            case STRUCTURE_ROAD:
                // Roads are cheap.
                pcm.set(b.rxy.x, b.rxy.y, 0x01);
                break;

            case STRUCTURE_CONTAINER:
                // You can walk on containers.
                break;

            case STRUCTURE_RAMPART:
                // You can only walk on ramparts you own.
                if (b.obMine) {
                    pcm.set(b.rxy.x, b.rxy.y, 0x01);
                } else {
                    pcm.set(b.rxy.x, b.rxy.y, 0xff);
                }
                break;
            
            default:
                // All other structures block movement.
                pcm.set(b.rxy.x, b.rxy.y, 0xff);
                break;
        }
    });

    // Find all non-moving creeps.
    r.aFind_finde_h(
        FIND_CREEPS, 
        {filter: function(c) {return !c.sMoving}}
    ).forEach(function(c) {
        // Motionless creeps block movement.
        pcm.set(c.rxy.x, c.rxy.y, 0xff);
    });

    // Store the cost matrix in the room memory, with a timestamp.
    r.mh.pcmz = pcm.z;
    r.mh.pcmtq = G.tq;
    return pcm;
};

var phGenerate_rxy_pga_h = function (rxyStart, pgaEnd, hOptions) {return PathFinder.search(rxyStart, pgaEnd, hOptions)};
var phGenerate_rxy_pg_h = function (rxyStart, pgEnd, hOptions) {return PathFinder.search(rxyStart, pgEnd, hOptions)};
var phGenerate_rxy_pga = function (rxyStart, pgaEnd) {return PathFinder.search(rxyStart, pgaEnd, {roomCallback: pcmFrom_rname})};
var phGenerate_rxy_pg = function (rxyStart, pgEnd) {return PathFinder.search(rxyStart, pgEnd, {roomCallback: pcmFrom_rname})};

module.exports = {
    cbGenerate_cbd_g: cbGenerate_cbd_g,
    gqFrom_cba: gqFrom_cba,
    pcmFrom_rname: pcmFrom_rname,
    pgaFrom_ba_rd: pgaFrom_ba_rd,
    pgFrom_rxy_rd: pgFrom_rxy_rd,
    pcmFrom_pcmz: pcmFrom_pcmz,
    pcmFrom_r: pcmFrom_r,
    phGenerate_rxy_pga_h: phGenerate_rxy_pga_h,
    phGenerate_rxy_pg_h: phGenerate_rxy_pg_h,
    phGenerate_rxy_pga: phGenerate_rxy_pga,
    phGenerate_rxy_pg: phGenerate_rxy_pg
};

