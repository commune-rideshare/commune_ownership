/*jslint browser: true, devel: true, node: true, nomen: true, plusplus: true*/
/*global $, jQuery*/

(function () {

  "use strict";

  global.$ = require('jquery');

  var Vue = require('vue'),
    Chance = require('chance'),
    chance = new Chance(),
    Chartist = require('chartist'),
    commune = require('./commune');

  var chart = {};

  new Vue({
    el: '#app',
    data: {
      time: commune.time,
      ownershipShares: commune.ownershipShares,
      networkFunds: commune.networkFunds,
      initialNumberOfDrivers: 100,
      numberOfDrivers: 0,
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

        chart = new Chartist.Line('.ct-chart', {
          series: []
        }, {
          showPoint: false,
          fullWidth: true,
          chartPadding: {
            right: 40
          }
        });

        $('#control').addClass('disabled');
        $('#simulation').removeClass('disabled');

        commune.init({
          initialNumberOfDrivers: this.initialNumberOfDrivers,
          averagePassengerPerRide: this.averagePassengerPerRide,
          downtime: this.downtime,
          feeDistributionFactor: this.feeDistributionFactor,
          averageDistance: this.averageDistance,
          averageSpeed: this.averageSpeed,
          population: this.population,
          timescale: this.timescale
        });

        var vueObject = this,
          updateTime = 0;

        setInterval(function () {

          var reply = commune.tick();

          if (updateTime === 10) {
            chart.update({
              series: [reply.numberOfDrivers]
            });
            updateTime = 0;
          } else {
            updateTime++;
          }

          vueObject.time = reply.time;
          vueObject.ownershipShares = reply.ownershipShares;
          vueObject.networkFunds = reply.networkFunds;
          vueObject.numberOfDrivers = Math.floor(reply.numberOfDrivers[reply.numberOfDrivers.length - 1]);
          vueObject.privateOwnership = reply.privateOwnership;
          vueObject.driverOwnership = reply.driverOwnership;

        }, 100);

      }
    }
  });

}());