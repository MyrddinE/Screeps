require('rename');
m = require('shared');
var tBOREDOM_LIMIT = 999;
module.exports.loop = function () {
    if (G.tq % 10 == 0 && G.cpuh.bucket < 9000) {
        console.log("CPU: " + G.cpuh.bucket)
    }

    for (var creepName in Game.creeps) {
        var creep = Game.creeps[creepName];
        if (!creep.memory.nearestSpawn) {
            creep.memory.nearestSpawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS).id
        }

        switch (creep.memory.role) {
			case 'sacrifice':
				switch (creep.memory.state) {
				    case 'drop':
						if (!creep.memory.nearestJob) {
							var job = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: function(b) {return b.yqFree > creep.yq}});
							if (job) {
							    creep.memory.nearestJob = job.id;
							} else {
							    // If there is nothing to do, sit at spawn.
							    creep.memory.state = 'die';
							}
						} else {
							if (Game.getObjectById(creep.memory.nearestJob)) {
								var job = Game.getObjectById(creep.memory.nearestJob);
								var yq = null;
								if (job.e == STRUCTURE_SPAWN) {yq = Math.min(job.yqFree - 20, creep.yq)}
								if (creep.vTransferY_t_q(job, yq) == ERR_NOT_IN_RANGE) {
								    creep.vMove_rxy(job);
								} else {
                                    creep.mh.nearestJob == false;
								}
								if (job.yqFree == 0) {
									creep.memory.nearestJob = false;
								}
							} else {
								creep.memory.nearestJob = false;
							}
						}
						break;
                    case 'die':
                        var spawn = G.objFrom_id(creep.memory.nearestSpawn);
                        if (spawn.vRecycle_c(creep) == ERR_NOT_IN_RANGE) {
                            creep.vMove_rxy(spawn);
                        }
                        break;
					default:
						creep.memory.state = 'drop';
						break;
				}
				if (creep.yq == 0) {
					creep.memory.state = 'die';
				}
				break;
			case 'harvester':
				if (creep.mh.nearestJob) {
					creep.mh.delete('nearestJob')
				}
				if (!creep.memory.nearestSource) {
					creep.memory.nearestSource = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE).id
				}
				var source = Game.getObjectById(creep.memory.nearestSource);
				switch (creep.memory.state) {
					case 'mine':
						if (creep.cqFree < 6) {
    						var container = Game.getObjectById(creep.mh.container);
    						if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    							creep.vMove_rxy(container);
							}
						}
						if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
							creep.vMove_rxy(source);
						}
						break;
                    case 'heal':
						if (creep.cq > 0) {
    						var container = Game.getObjectById(creep.mh.container);
    						if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    							creep.vMove_rxy(container);
							}
						} else {
                            var spawn = G.objFrom_id(creep.memory.nearestSpawn);
                            if (spawn.vRenew_c(creep) == ERR_NOT_IN_RANGE) {
                                creep.vMove_rxy(spawn);
                            }
						}
						if (creep.ticksToLive > 1300) {
							creep.memory.state = 'mine'
						}
						break;
					default:
						creep.memory.state = 'mine';
						break;
				}
				if (creep.ticksToLive < 200) {
					creep.memory.state = 'heal'
				}
				break;
			case 'builder':
				if (creep.memory.nearestSource) {
					creep.memory.nearestSource = false;
				}
				switch (creep.memory.state) {
					case 'load':
					    if (creep.pos.findInRange(FIND_DROPPED_RESOURCES, 10, {filter: function(r) {return r.yq > 25}}).length > 0) {
					        var pile = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
					        if (creep.pickup(pile) == ERR_NOT_IN_RANGE) {
					            creep.vMove_rxy(pile);
					        }
					    } else {
    						var energy = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: function(b) {return (b.yq >= creep.yqFree) && (b.yqx > 50) && !(b.e == STRUCTURE_SPAWN)}});
    						if (energy && energy.vTransferY_c_q(creep) == ERR_NOT_IN_RANGE) {
    							creep.vMove_rxy(energy);
							}
						}
						if (creep.yqFree == 0) {
        					if (!creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES)) {
        						creep.memory.state = 'upgrade_controller';
        					} else {
            					creep.memory.state = 'do_job';
            					creep.memory.bored = 0;
							}
						}
						break;
                    case 'heal':
                        var spawn = G.objFrom_id(creep.memory.nearestSpawn);
                        if (spawn.vRenew_c(creep) == ERR_NOT_IN_RANGE) {
                            creep.vMove_rxy(spawn);
                        }
						if (creep.ticksToLive > 1300) {
							creep.memory.state = 'load'
						}
						break;
					case 'do_job':
					    var job = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
						if (!creep.memory.nearestJob) {
							if (job) {
							    creep.memory.nearestJob = job.id;
							} else {
							    creep.memory.state = 'load';
							}
						} else {
							if (Game.getObjectById(creep.memory.nearestJob)) {
								job = Game.getObjectById(creep.memory.nearestJob);
								if (creep.build(job) == ERR_NOT_IN_RANGE) {
									creep.vMove_rxy(job);
								}
							} else {
								creep.memory.nearestJob = false;
							}
						}
						if (creep.cq == 0) {creep.memory.state = 'load';}
						break;
					case 'upgrade_controller':
						if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
							creep.vMove_rxy(creep.room.controller);
						}
						if (creep.yq == 0) {creep.memory.state = 'load';}
						break;
					default:
						creep.memory.state = 'load';
						break;
				}
				if (creep.ticksToLive < 200) {
					creep.memory.state = 'heal'
				}
				break;
			case 'repair':
				if (creep.memory.nearestSource) {
					creep.memory.nearestSource = false;
				}
				switch (creep.memory.state) {
					case 'load':
					    if (creep.pos.findInRange(FIND_DROPPED_RESOURCES, 10, {filter: function(r) {return r.yq > 25}}).length > 0) {
					        var pile = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
					        if (creep.pickup(pile) == ERR_NOT_IN_RANGE) {
					            creep.vMove_rxy(pile);
					        }
					    } else {
    						var energy = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: function(b) {return !(b.e == STRUCTURE_SPAWN) && (b.yq >= creep.yqFree) && (b.yqx > 50)}});
    						if (energy && energy.vTransferY_c_q(creep) == ERR_NOT_IN_RANGE) {
    							creep.vMove_rxy(energy);
							}
						}
						creep.memory.nearestWall = false;
						if (creep.yq > 20) {
							creep.memory.state = 'repair'
						}
						break;
                    case 'heal':
                        var spawn = G.objFrom_id(creep.memory.nearestSpawn);
                        if (spawn.vRenew_c(creep) == ERR_NOT_IN_RANGE) {
                            creep.vMove_rxy(spawn);
                        }
						if (creep.ticksToLive > 1300) {
							creep.memory.state = 'load'
						}
						break;
					case 'repair':
						if (!creep.memory.nearestJob) {
							var job = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: function(b) {return !(b.e == STRUCTURE_WALL || b.e == STRUCTURE_RAMPART) && (b.hits < b.hitsMax / 2)}});
							if (job) {
							    creep.memory.nearestJob = job.id;
							} else {
							    // If there is nothing to do, repair a wall.
							    if (!creep.memory.nearestWall) {
    							    var walls = creep.room.find(FIND_STRUCTURES, {filter: function(b) {return b.e == STRUCTURE_WALL || b.e == STRUCTURE_RAMPART}});
    							    if (walls.length > 0) {
        							    var hqnix = 0;
    							        for (ix = 1; ix < walls.length; ix++) {
    							            hqnix = walls[ix].hq > walls[hqnix].hq ? hqnix : ix;
    							        }
    							        creep.memory.nearestWall = walls[hqnix].id
							        }
							    } else {
							        var wall = G.objFrom_id(creep.memory.nearestWall);
    								if (creep.repair(wall) == ERR_NOT_IN_RANGE) {
    									creep.vMove_rxy(wall);
    								}
							    }
							}
						} else {
							if (Game.getObjectById(creep.memory.nearestJob)) {
								let job = Game.getObjectById(creep.memory.nearestJob);
								if (job.hits * 1.1 > job.hitsMax) {
								    creep.memory.nearestJob = false;
								}
								if (creep.repair(job) == ERR_NOT_IN_RANGE) {
									creep.vMove_rxy(job);
								}
							} else {
								creep.memory.nearestJob = false;
							}
						}
						if (creep.yq == 0) {
							creep.memory.state = 'load'
						}
						break;
					default:
						creep.memory.state = 'load';
						break;
				}
				if (creep.ticksToLive < 200) {
					creep.memory.state = 'heal'
				}
				break;
			case 'transfer':
				if (!creep.mh.container) {
					creep.mh.container = '575dba03028114ce191c1838';
				}
				switch (creep.memory.state) {
					case 'load':
					    if (creep.pos.findInRange(FIND_DROPPED_RESOURCES, 10, {filter: function(r) {return r.yq > 25}}).length > 0) {
					        var pile = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {filter: function(r) {return r.yq > 25}});
					        if (creep.pickup(pile) == ERR_NOT_IN_RANGE) {
					            creep.vMove_rxy(pile);
					        }
					    } else {
    						var job = Game.getObjectById(creep.mh.container);
    						if (job.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    							creep.vMove_rxy(job);
							}
						}
						creep.memory.nearestJob = false;
						if (creep.yqFree == 0) {
							creep.memory.state = 'store';
						}
						break;
                    case 'heal':
                        var spawn = G.objFrom_id(creep.memory.nearestSpawn);
                        if (spawn.vRenew_c(creep) == ERR_NOT_IN_RANGE) {
                            creep.vMove_rxy(spawn);
                        }
						if (creep.ticksToLive > 1300) {
							creep.memory.state = 'load'
						}
						break;
					case 'store':
						if (!creep.memory.nearestJob) {
							var job = creep.pos.findClosestByRange(FIND_STRUCTURES, {
							    filter: function(b) {
							        return (
							            !(b.id == creep.mh.container) && 
							            (b.yqFree > 0 && !(b.e == STRUCTURE_SPAWN)) ||
							            (b.yqFree - 20 > 0 && b.e == STRUCTURE_SPAWN)
                                    )
							    }
							});
							if (job) {
							    creep.memory.nearestJob = job.id;
							} else {
							    // If there is nothing to do, sit at spawn.
							    creep.memory.state = 'load';
							}
						} else {
							if (Game.getObjectById(creep.memory.nearestJob)) {
								var job = Game.getObjectById(creep.memory.nearestJob);
								var yq = null;
								if (job.e == STRUCTURE_SPAWN) {yq = Math.min(job.yqFree - 20, creep.yq)}
								if (creep.vTransferY_t_q(job, yq) == ERR_NOT_IN_RANGE) {
								    creep.vMove_rxy(job);
								} else {
        						    creep.mh.nearestJob == false;
								}
								if (job.yqFree == 0) {
									creep.memory.nearestJob = false;
								}
							} else {
								creep.mh.nearestJob = false;
							}
						}
						if (creep.yq == 0) {creep.memory.state = 'load';}
        				break;
					default:
						creep.memory.state = 'load';
						break;
				}
				if (creep.ticksToLive < 200) {
					creep.memory.state = 'heal'
				}
				break;
			case 'level':
				if (creep.memory.nearestSource) {
					creep.memory.nearestSource = false;
				}
				switch (creep.memory.state) {
					case 'load':
					    if (creep.pos.findInRange(FIND_DROPPED_RESOURCES, 10, {filter: function(dr) {return dr.yq > 25}}).length > 0) {
					        var pile = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
					        if (creep.pickup(pile) == ERR_NOT_IN_RANGE) {
					            creep.vMove_rxy(pile);
							}
						} else {
					        var b = null;
					        if (creep.mh.fullestContainer) {
					            b = G.objFrom_id(creep.mh.fullestContainer);
					        } else {
        						var ba = creep.room.aFind_finde_h(FIND_STRUCTURES,{filter: function(b) {b.e == STRUCTURE_CONTAINER}});
        						if (ba.length > 0) {
            						var yqxix = 0;
            						for (var ix = 1; ix < ba.length; ix++) {
            						    yqxix = ba[yqxix].yq > ba[ix].yq ? yqxix : ix;
									}
									console.log(yqxix + ": " + b.name + ", " + b.id);
                                    b = ba[yqxix];
                                    creep.mh.fullestContainer = b.id;
								}
							}
							/*					        if (b.vTransferY_c_q(creep) == ERR_NOT_IN_RANGE) {
					            creep.vMove_rxy(b.rxy);
					        } else {
					            creep.mh.fullestContainer = false;
					        }
*/
						}
						creep.memory.nearestJob = false;
						break;
                    case 'heal':
                        var spawn = G.objFrom_id(creep.memory.nearestSpawn);
                        if (spawn.vRenew_c(creep) == ERR_NOT_IN_RANGE) {
                            creep.vMove_rxy(spawn);
                        }
						if (creep.ticksToLive > 1300) {
							creep.memory.state = 'load'
						}
						break;
					case 'store':
						if (!creep.memory.nearestJob) {
							var job = creep.pos.findClosestByRange(FIND_STRUCTURES, {
							    filter: function(b) {
							        return (
							            !(b.id == '575c464b152a626114ed36e7') && 
							            !(b.id == '575a3e5a6cb417d9026af07e') && 
							            (b.yqFree > 0 && !(b.e == STRUCTURE_SPAWN)) ||
							            (b.yqFree - 20 > 0 && b.e == STRUCTURE_SPAWN)
                                    )
							    }
							});
							if (job) {
							    creep.memory.nearestJob = job.id;
							} else {
							    // If there is nothing to do, sit at spawn.
							    creep.memory.state = 'load';
							}
						} else {
							if (Game.getObjectById(creep.memory.nearestJob)) {
								var job = Game.getObjectById(creep.memory.nearestJob);
								var yq = null;
								if (job.e == STRUCTURE_SPAWN) {yq = Math.min(job.yqFree - 20, creep.yq)}
								if (creep.vTransferY_t_q(job, yq) == ERR_NOT_IN_RANGE) {
								    creep.vMove_rxy(job);
								} else {
        						    creep.mh.nearestJob == false;
								}
								if (job.yqFree == 0) {
									creep.memory.nearestJob = false;
								}
							} else {
								creep.memory.nearestJob = false;
							}
						}
						break;
					default:
						creep.memory.state = 'load';
						break;
				}
				if (creep.yq == 0) {
					creep.memory.state = 'load';
				} else if (creep.yqFree == 0) {
    				creep.memory.state = 'store';
				}
				if (creep.ticksToLive < 200) {
					creep.memory.state = 'heal'
				}
				break;
		}
    }
};