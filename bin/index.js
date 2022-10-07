// read in env settings
require('dotenv').config();

const fetch = require('./fetch');
const auth = require('./auth');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/43U4', async (req, res)=>{
    try {
        const authResponse = await auth.getToken(auth.tokenRequest);
        const site = await fetch.callApi(process.env.GRAPH_ENDPOINT + '/v1.0/sites/' + process.env.HOSTNAME + process.env.TCM43U4, authResponse.accessToken);
        res.send(site);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.listen('3001', ()=> {
    console.log('Running');
});
