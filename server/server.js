const express = require('express');
const cors = require("cors");
const app = express();
const port = 8000;
const RoutesUser = require('./routes/routes');

require('./configuration/configuration.mongoose');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

RoutesUser(app);

app.listen(port, () => {
    console.log(`El servidor se está ejecutando en el puerto: ${port}`);
});