
var mongoose = require('mongoose'), 
    Rescuer = require('../models/rescuers.server.model.js'),
    Rescuee = require('../models/rescuees.server.model.js'),
    http = require('http'),
    fs = require('fs'),
    gpxParse = require("gpx-parse");

function link(rescuer_id, rescuee_id) {
  // Link the rescuee and the rescuer
  console.log('linking');
  Rescuer.findOneAndUpdate({_id: rescuer_id}, {$push: {"assigned_rescuees": rescuee_id}}, (err) => {if(err) console.log(err); else console.log('linked rescuer')});
  Rescuee.findOneAndUpdate({_id: rescuee_id}, {"status": {"assigned": true, "assigned_to": rescuer_id}}, (err) => {if(err) console.log(err); else console.log('linked rescuee')});
}

function unlink(rescuer_id, rescuee_id) {
  // Unlink the rescuee from the rescuer without marking them as rescued
  Rescuer.findOneAndUpdate({_id: rescuer_id}, {$pull: {"assigned_rescuees": rescuee_id}}, (err) => {if(err) console.log(err); else console.log('unlinked rescuer')});
  Rescuee.findOneAndUpdate({_id: rescuee_id}, {"status": {"assigned": false, "assigned_to": null}}, (err) => {if(err) console.log(err); else console.log('unlinked rescuee')});
}

function unlink_finish(rescuer_id, rescuee_id) {
  // Mark the rescuee as rescued and unlink them from the rescuer
  Rescuer.findOneAndUpdate({_id: rescuer_id}, {$pull: {"assigned_rescuees": rescuee_id}}, (err) => {if(err) console.log(err); else console.log('finish rescuer')});
  Rescuee.findOneAndUpdate({_id: rescuee_id}, {"status": {"picked_up": true, "assigned_to": null}}, (err) => {if(err) console.log(err); else console.log('finish rescuee')});
}

function findOptimalOrder(rescueelist) {
  return rescueelist;
  // returns the list of rescuees, but in optimal order
}

function requestGPX(rescuer, pts, wateralt, callback) {
  // This is the sauce. Here we call BRouter and get a topographical aware map
  //  and save a GPX result file
  // callback will have a parameter with a string of the path of the GPX file

  var call = "http://nas.jaxnb.net:17777/brouter?lonlats=";
  for(var pti in pts) {
    var pt = pts[pti];
    call += pt.longitude + "," + pt.latitude + "|";
  }
  call = call.substring(0, call.length-1);
  call += "&nogos=&profile=shortest&alternativeidx=0&format=gpx&maxalt=";
  call += (wateralt - rescuer.boat_depth);

  console.log('Fetching from \"' + call + '\"');

  const file = fs.createWriteStream(rescuer._id + ".gpx");
  console.log('just before gpx request');
  const request = http.get(call, function(response) {
    response.pipe(file);
    console.log('reqgpx func');
    callback(rescuer._id + ".gpx");
  });
}

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
                      assigned_rescuees : null,
                      current_gpx_uri   : null
                    };

  Rescuer.findOne({phone: requestobj.phone}).exec(function(err, rescuer) {
    var newUser = false;
    if(err || rescuer == null) {
      newUser = true;
      rescuer = new Rescuer(requestobj);
      rescuer._id = mongoose.Types.ObjectId();
    } else {
      rescuer.name          = requestobj.name;
      rescuer.boat          = requestobj.boat;
      rescuer.boat_capacity = requestobj.boat_capacity;
      rescuer.boat_depth    = requestobj.boat_depth;
      current_gpx_uri       = null;
    }

    if(rescuer.assigned_rescuees != null) {
      for(var assigned_rescuee_idx in rescuer.assigned_rescuees) {
        var assigned_rescuee = rescuer.assigned_rescuees[assigned_rescuee_idx];
        unlink(rescuer._id, assigned_rescuee);
      }
    }
    rescuer.assigned_rescuees = [];
    rescuer.save(err4 => {});

    console.log('got sorta far');

    rescueelist = [];
    Rescuee.find({"status.assigned" : false})
           .sort({"time" : -1})
           .limit(rescuer.boat_capacity)
           .exec((err2, rescueez) => {

      if(err2) {
        res.status(500).send('No people are queued').end();
        return;
      }

      console.log(rescueez);
      for(var rescueeidx in rescueez) {
        var rescuee = rescueez[rescueeidx];
        //console.log(rescuee);
        console.log('er ' + rescuer.id + '  ee ' + rescuee._id);
        link(rescuer._id, rescuee._id);
        rescueelist.push(rescuee);
      }

      console.log('query THEN');
      if(rescueelist.length == 0) return; // Should have already sent the result end

      console.log('Here is the list, fyi');
      console.log(rescueelist);

      var optrescueeorder = findOptimalOrder(rescueelist);

      var pts = [];
      pts.push({"longitude": req.body.longitude, "latitude": req.body.latitude});
      for(var rescueeidx in optrescueeorder) {
        var rescuee = optrescueeorder[rescueeidx];
        pts.push({"longitude": rescuee.longitude, "latitude": rescuee.latitude});
      }
      pts.push({"longitude": req.body.longitude, "latitude": req.body.latitude});

      console.log('before gpx');
      requestGPX(rescuer, pts, 31, (gpxURI) => { // TODO Need to insert WATERALT with the altitude at which the water is
        console.log('gpx callback');
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
  Rescuer.findOne({phone: req.query.phone}).exec((err, rescuer) => {
    if(err || rescuer.current_gpx_uri == null) {
      console.log(err);
      res.status(500).send(err);
    } else {
      //res.sendFile(path.join(rescuer.current_gpx_uri));
      /*parseGpx(rescuer.current_gpx_uri).then(track => {
        console.log(track);
          //console.log(track[0].latitude); // 43.512926660478115
          res.json({"track":track});
      });*/
      gpxParse.parseGpxFromFile(rescuer.current_gpx_uri, function(error, data) {
        //do stuff
        if(error) {
          console.log(error);
          res.status(500).send(error);
        } else {
          console.log(data);
          res.json(data);
        }
      });
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


