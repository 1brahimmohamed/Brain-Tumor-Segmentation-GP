const express = require("express");
const cors = require("cors");
const http = require('http');
const https = require('https');

const app = express();
const PORT = 4000;

app.use(cors());

app.get("/", (req, res) => {
    res.json([
        {
            id: "1",
            name: "Ibrahim Mohamed: Software",
        },
        {
            id: "2",
            name: "Mohamed Ismail: Software",
        },
        {
            id: "3",
            name: "Mahmoud Yaser: Artificial Intelligence",
        },
        {
            id: "4",
            name: "Ahmed Hassan: Artificial Intelligence",
        },
        {
            id: "5",
            name: "Maha Medhat: Artificial Intelligence",
        },
    ]);
});

// Define a route for the proxy server
app.get('/proxy', (req, res) => {
    const targetUrl = req.query.target || '';
    console.log('Proxy request for:', targetUrl)
    console.log('Request headers:', req.headers)

    // Determine the protocol (http or https) based on the target URL
    const targetProtocol = targetUrl.startsWith('https://') ? https : http;

    targetProtocol.get(targetUrl, {
        headers: req.headers
    }, (targetRes) => {
        res.writeHead(targetRes.statusCode, targetRes.headers);
        targetRes.pipe(res);
    }).on('error', (e) => {
        console.log(e);
    });
});

app.listen(PORT, () => {
    console.log(
        `Graduation Project node app on container is listening for requests on port ${PORT}`
    );
});
