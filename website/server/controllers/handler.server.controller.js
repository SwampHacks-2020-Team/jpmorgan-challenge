
var mongoose = require('mongoose'), 
    Rescuer = require('../models/rescuers.server.model.js'),
    Rescuee = require('../models/rescuees.server.model.js'),
    http = require('http'),
    fs = require('fs');

exports.rescueeRequest = (req, res) => {
    var requestobj =   {   name      : req.body.name,
                           numPeople : req.body.numPeople,
                           phone     : req.body.phone,
                           longitude : req.body.longitude,
                           latitude  : req.body.latitude,
                           time      : new Date(),
                           message   : req.body.message,
                           status: {
                            assigned: false,
                            assigned_to: null,
                            picked_up: false
                          }
                        };
    var rescuee = new Rescuee(requestobj);
    rescuee.save(err => {
      if(err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).end();
      }
    });
};

exports.rescuerNewMission = (req, res) => {
  var requestobj = {
                      name              : req.body.name,
                      phone             : req.body.phone,
                      boat              : req.body.boat,
                      boat_capacity     : req.body.boat_capacity,
                      boat_depth        : req.body.boat_depth,
                      numPeople         : req.body.numPeople,
                      assigned_rescuees : null,
                      current_gpx_uri   : null
                    };

  Rescuer.findOne({phone: requestobj.phone}).exec(function(err, rescuer) {
    var newUser = false;
    if(err) {
      newUser = true;
      rescuer = new Rescuer(requestobj);
      // TODO GET ID FOR THIS
    } else {
      rescuer.name          = requestobj.name;
      rescuer.boat          = requestobj.boat;
      rescuer.boat_capacity = requestobj.boat_capacity;
      rescuer.boat_depth    = requestobj.boat_depth;
      rescuer.numPeople     = requestobj.numPeople;
      current_gpx_uri       = null;
    }

    if(rescuer.assigned_rescuees != null) {
      for(var assigned_rescuee in rescuer.assigned_rescuees) {
        unlink(rescuer._id, assigned_rescuee);
      }
    }
    rescuer.assigned_rescuees = [];

    rescueelist = [];
    Rescuee.find({"status" : {"assigned" : false}})
            .sort({"time" : -1})
            .limit(rescuer.boat_capacity)
            .exec((err2, rescuee) => {

              if(err2) {

                // No people queued
              }

              link(rescuer._id, rescuee._id);
              rescueelist.push(rescuee);

    }).then(function(doc) {
      
      var optrescueeorder = findOptimalOrder(rescueelist);

      requestGPX((gpxURI) => {
        rescuer.current_gpx_uri = gpxURI;
        rescuer.save(err3 => {
          if(err3) {
            console.log(err3);
            res.status(500).send(err3);
          } else {
            res.status(200).end();
          }
        });
      });
    });
  });
};

exports.getGPX = (req, res) => {
  Rescuer.findOne({phone: req.body.phone}).exec((err, rescuer) => {
    if(err || rescuer.current_gpx_uri == null) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.sendFile(path.join(rescuer.current_gpx_uri));
    }
  });
};

exports.rescueePickedUp = (req, res) => {
  Rescuer.findOne({phone: req.body.phone}).exec((err, rescuer) => {
    if(err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      unlink_finish(rescuer._id, req.body.rescuee_id);
      res.status(200).end();
    }
  });
};


