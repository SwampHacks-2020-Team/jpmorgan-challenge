const axios = require('axios');

module.exports.getHelp= (name, numPeople, phone, message) => {
    axios.post("/api/email", {
        name: name,
        numPeople: numPeople,
        phone: phone,
        message: message
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
}
