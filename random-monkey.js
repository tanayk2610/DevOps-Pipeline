var faker = require('faker');

var num_files = 8;
var action = faker.random.number({min: 1, max: num_files});
// action = 0;
const shell = require('shelljs');
shell.exec('bash ./Chaos/'+action+'.sh');
