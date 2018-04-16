var http = require('http'),
    httpProxy = require('http-proxy'),
    request = require('request');

// Stable and canary servers
var stable = {
        host: process.env.stable,     // "{{ stable_ip }}"
        port: 80
    },
    canary = {
        host: process.env.canary,     // "{{ canary_ip }}"
        port: 80
    };

var servers = [stable, canary];

// Proxy server
var proxy = httpProxy.createProxyServer();
var count = 0;
http.createServer(function (req, res) {
        count++;
    console.log("\n count", count++, "\n");
    var currentTarget = stable; //servers.shift();
   var url = `${currentTarget.host}:${currentTarget.port}`;
//    console.log("DEBUG url",url);
if(count%3 == 0)
        currentTarget = canary;
else
        currentTarget = stable;
    request.get(`http://${url}`, function (err, resp, body) {
         console.log("DEBUG", "Request complete");
        console.log("Error:"+err+"Response"+resp.statusCode);
        if (err || resp.statusCode != 200) {
            console.log("Re-reouting to stable server");
            currentTarget = stable;
        }
         console.log('Balancing to', currentTarget.host);
        proxy.web(req, res, { target: currentTarget });
    });

//    servers.push(currentTarget);
}).listen(3000);
