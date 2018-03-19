const istanbul = require('istanbul-middleware');
const app = require('express')();
istanbul.hookLoader(__dirname);
app.use('/coverage', istanbul.createHandler({verbose: true}));
require('./server.js');
app.listen(8888);
console.log("See coverage at IP:8888/coverage");