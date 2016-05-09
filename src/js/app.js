/*jslint browser: true, devel: true, node: true, nomen: true, plusplus: true*/
/*global $, jQuery*/

(function () {

  "use strict";
  
  global.$          = require('jquery');

  var Vue           = require('vue'),
      Moment        = require('moment'),
      Chance        = require('chance'),
      chance        = new Chance(),
      commune       = require('./commune');
  
  new Vue({
    el: '#app',
    data: {
      time: commune.time,
      ownershipShares: commune.ownershipShares,
      networkFunds: commune.networkFunds,
      numberOfDrivers: commune.numberOfDrivers,
      growthRate: commune.growthRate,
      averagePassengerPerRide: commune.averagePassengerPerRide,
      downtime: commune.downtime,
      feeDistributionFactor: commune.feeDistributionFactor,
      averageDistance: commune.averageDistance,
      averageSpeed: commune.averageSpeed,
      population: commune.population,
      timescale: commune.timescale,
      privateOwnership: commune.privateOwnership,
      driverOwnership: commune.driverOwnership
    },
    methods: {
      startSimulation: function () {
              
        $('#control').addClass('disabled');
        $('#simulation').removeClass('disabled');

        commune.init({ 
            numberOfDrivers: this.numberOfDrivers, 
            averagePassengerPerRide: this.averagePassengerPerRide, 
            downtime: this.downtime, 
            feeDistributionFactor: this.feeDistributionFactor, 
            averageDistance: this.averageDistance, 
            averageSpeed: this.averageSpeed,
            population: this.population, 
            timescale: this.timescale
          });

        var vueObject = this;

        setInterval(function(){

          var reply = commune.tick();

          vueObject.time = reply.time,
          vueObject.ownershipShares = reply.ownershipShares;
          vueObject.networkFunds = reply.networkFunds;
          vueObject.numberOfDrivers = reply.numberOfDrivers;
          vueObject.privateOwnership = reply.privateOwnership;
          vueObject.driverOwnership = reply.driverOwnership;

        }, 100);

      }
    }
  });

}());