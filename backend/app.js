const express = require('express');
const db = require('./db/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {readdirSync} = require('fs');
require('dotenv').config();


const app = express();

//db connection
db()
//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require(`./routes/` + route)));



//server
const server = (port) => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    }).on('error', (err) => {
        console.log(err);
    })
}

server(process.env.PORT || 8000);