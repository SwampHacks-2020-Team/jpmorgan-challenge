const axios = require('axios');

module.exports.sendEmail= (name, email, message) => {
    axios.post("/api/email", {
        name: name,
        email: email,
        message: message
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
}
