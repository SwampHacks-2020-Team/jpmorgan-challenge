const express = require('./config/express.js');
 
// Use env port or default
const port = process.env.PORT || 5000;
const googlekey = process.env.MAPS_KEY || require('./config/config.js').google.key;

const app = express.init();

app.get("/getKey", (req, res) => {
    return res.json("AIzaSyAcCv2aPhvkiRdWFtFptCuobFWxza1G4Ww");
});

app.listen(port, () => console.log(`Server now running on port ${port}!`));
