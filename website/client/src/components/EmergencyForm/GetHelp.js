const axios = require('axios');

module.exports.getHelp= (name, numPeople, phone, longitude, latitude, message) => {
    axios.post("/api/email", {
        name: name,
        numPeople: numPeople,
        phone: phone,
        longitude: longitude,
        latitude: latitude,
        message: message
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
}
