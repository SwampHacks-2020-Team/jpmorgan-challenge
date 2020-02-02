const express = require('./config/express.js');

let keyImport = require('./config/config.js');
 
// Use env port or default
const port = process.env.PORT || 5000;

const app = express.init();

app.get("/getKey", (req, res) => {
    return res.json(keyImport.google.key)
});

app.listen(port, () => console.log(`Server now running on port ${port}!`));
