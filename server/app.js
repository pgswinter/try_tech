import http from 'http';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

const hostname = '127.0.0.1';
const app = express()
const server = http.createServer(app);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/',express.static('public'));


server.listen(
    8899,
    hostname,
    () => {
        console.log(`Server running at http://${hostname}:8899/`);
    })