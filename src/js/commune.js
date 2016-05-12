/*jslint browser: true, devel: true, node: true, nomen: true, plusplus: true*/
/*global $, jQuery*/

"use strict";

var moment = require('moment');

var commune = {
  time: 0,
  numberOfDrivers: [],
  averagePassengerPerRide: 2,
  downtime: 0.5,
  feeDistributionFactor: 0.2,
  averageDistance: 2,
  growthRate: 0.2,
  averageSpeed: 40,
  population: 1000000,
  timescale: 3600,
  ownershipShares: 0,
  networkFunds: 0,
  privateOwnership: 1,
  driverOwnership: 0,
  init: function init(data) {
        
    this.numberOfDrivers.push(data.initialNumberOfDrivers);
    this.averagePassengerPerRide = data.averagePassengerPerRide;
    this.downtime = data.downtime;
    this.feeDistributionFactor = data.feeDistributionFactor;
    this.averageDistance = data.averageDistance;
    this.speed = data.speed;
    this.population = data.population;
    this.timescale = data.timescale;
        
  },
  tick: function tick() {
    
    // Add one hour to time
    this.time++;
    
    // Increase number of drivers and add the number to the time series
    var currentNumberOfDrivers =  this.numberOfDrivers[this.numberOfDrivers.length - 1];    
    this.numberOfDrivers.push(currentNumberOfDrivers + (currentNumberOfDrivers * 0.003));
        
    return({
      time: moment.duration(this.time, "hours").humanize(),
      numberOfDrivers: this.numberOfDrivers,
      ownershipShares: this.ownershipShares,
      networkFunds: this.networkFunds,
      privateOwnership: this.privateOwnership,
      driverOwnership: this.driverOwnership,
    });
  }
};

module.exports = commune;