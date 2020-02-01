exports.msg_received = (req, res) => {
    const name       = req.body.name,
          numPeople  = req.body.numPeople,
          phone      = req.body.phone,
          longitude  = req.body.longitude,
          latitude   = req.body.latitude,
          message    = req.body.message;

    const msgOptions = {   name      : name,
                           numPeople : numPeople,
                           phone     : phone,
                           longitude : longitude,
                           latitude  : latitude,
                           message   : message
                        };
    res.json(mailOptions);
};
