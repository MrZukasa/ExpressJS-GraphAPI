// read in env settings
require('dotenv').config();

const fetch = require('./fetch');
const auth = require('./auth');
const readline = require('readline');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var exit =1;

function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}

async function main() {
    while (exit> 0) {
        const ans = await askQuestion("\nChe cosa si fa? ");
        switch (ans) {
            case 'getUsers':
                try {
                    // here we get an access token
                    const authResponse = await auth.getToken(auth.tokenRequest);

                    // call the web API with the access token
                    const users = await fetch.callApi(auth.apiConfig.uri, authResponse.accessToken);

                    // display result
                    console.log(users);
                } catch (error) {
                    console.log(error);
                }
                break;
            case '43U4':
                const authResponse = await auth.getToken(auth.tokenRequest);
                const site = await fetch.callApi(process.env.GRAPH_ENDPOINT + '/v1.0/sites/' + process.env.HOSTNAME + process.env.CLIENT43U4, authResponse.accessToken);
                console.log(site);
                break;
            case 'q':
                exit =-1;
                console.log("\r\nBye!")
                process.exit(exit);
                break;
            case 'cc':
                console.clear();
                break;
            default:
                console.log('Non hai selezionato nulla! \n');
                break;
        }
    }
};

main();
