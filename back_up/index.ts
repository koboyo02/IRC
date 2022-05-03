require('./dbconn');
import http from 'http'

const requestListener = function (req, res) {
    res.writeHead(200);
    res.end("My first server!");
};

const server = http.createServer(requestListener);
server.listen(8080, () => {
    console.log("8080");
});

