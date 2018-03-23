/**
 * NodeJS Test Generation Module
 */


// Core/NPM Modules
const path = require('path');

// Local Modules
const constraints = require('./analyzer');
const tester = require('./testgenerator');
const db = require('./db.js');
//const routeParser = require('./routeParser');

// Polyfills
require('./format-polyfill');

/**
 * Parse an input file and generate test cases for it.
 */
(module.exports.main = function () {

    // Parse file input, defaulting to subject.js if not provided
    let args = process.argv.slice(2);
    if (args.length === 0) {
        args = ["server.js"];
    }
    let filePath = path.resolve(args[0]);

    // Initialize constraints based on input file
    let functionConstraints = constraints(filePath);
    // tester.insertInDB(tester.generateTestCases,filePath, functionConstraints)
    // let routeConstraints = routeParser();
    // Generate test cases
    tester.generateTestCases(filePath, functionConstraints);
    // var cb = tester.generateTestCases;
    //  console.log(typeof )
    // setTimeout(function () {
    // console.log(routeConstraints)
    // tester.generateTestCases(filePath, functionConstraints, routeConstraints);
    // }, 3000);

    // Inserting test data in db=atabase
    db.insertStudy();
    db.insertVote();
})();