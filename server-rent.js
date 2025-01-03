const express = require('express')
const path = require('path')
const https = require('https');
const fs = require('fs');

const PORT = process.env.PORT || 7002

const app = express()
app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname, 'build')))

// Certificate
const privateKey = fs.readFileSync('privkey.pem', 'utf8'); //fs.readFileSync('/etc/letsencrypt/live/proj.uley.team/privkey.pem', 'utf8');
const certificate = fs.readFileSync('cert.pem', 'utf8'); //fs.readFileSync('/etc/letsencrypt/live/proj.uley.team/cert.pem', 'utf8');
const ca = fs.readFileSync('chain.pem', 'utf8'); //fs.readFileSync('/etc/letsencrypt/live/proj.uley.team/chain.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const httpsServer = https.createServer(credentials, app);

const start = async () => {
    try {       
        httpsServer.listen(PORT, () => {
            console.log('HTTPS Server WebApp Renthub running on port ' + PORT);
        });

    } catch (error) {
        console.log(error)
    }
}

start()

