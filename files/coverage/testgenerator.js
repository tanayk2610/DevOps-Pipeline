//import { insertStudy, insertVote } from './db.js';

// Core/NPM Modules
const product = require('iter-tools/lib/product');
const fs = require("fs");
const mock = require('mock-fs');
const _ = require('lodash');
const faker = require("faker");
const request = require('request');
const db = require('./db.js');

/**
 * Generate test cases based on the global object constraints.
 *
 * @param {String} filepath            Path to write test file.
 * @param {Object} constraints          Constraints object as returned by `constraints`.
 */
function generateTestCases(filepath, constraints) {

    //MongoDB insert and get id1 and id2
    var id1 = db.insertStudy();
    var id2 = db.insertVote();
    var token1 = 1, token2 = 2;

    // Content string. This will be built up to generate the full text of the test string.
    let content = `let subject = require('${filepath}')\nlet mock = require('mock-fs');\n`;

    // Iterate over each function in constraints
    for (var i = 0; i < constraints.length; i++) {
        if (constraints[i].type === 'get') {
            if (constraints[i].paramName && constraints[i].paramName === 'id') {
                var api1 = `${constraints[i].api}` + '/' + id1;
                console.log("GET: ", api1);
                var api2 = `${constraints[i].api}` + '/' + id2;
                console.log("GET: ", api2);
            }

            else if (constraints[i].paramName && constraints[i].paramName === 'token') {
                var api1 = `${constraints[i].api}` + '/' + token1;
                console.log("GET: ", api1);
                var api2 = `${constraints[i].api}` + '/' + token2;
                console.log("GET: ", api2);
            }

            // const options = {
            //     method: 'GET',
            //     uri: api1
            //   }              ​
            //   request(options)
            //     .then(function (response) {
            //       console.log("Test Successful ");
            //     })
            //     .catch(function (err) {
            //       console.log("Test Failed : \n",err);
            //     })

            // const options = {
            //     method: 'GET',
            //     uri: api2
            //   }              ​
            //   request(options)
            //     .then(function (response) {
            //       console.log("Test Successful ");
            //     })
            //     .catch(function (err) {
            //       console.log("Test Failed : \n",err);
            //     })

        }
        else if (constraints[i].type === 'post') {
            console.log("POST: ", constraints[i].api);
            // const options = {
            //     method: 'POST',
            //     uri: constraints[i].api,
            //     body: json1,
            //     json: true
            //   }
            //   ​
            //   request(options)
            //     .then(function (response) {
            //       console.log("Test Successful ");
            //     })
            //     .catch(function (err) {
            //       console.log("Test Failed : \n",err);
            //     })

            // const options = {
            //     method: 'POST',
            //     uri: constraints[i].api,
            //     body: json2,
            //     json: true
            //   }
            //   ​
            //   request(options)
            //     .then(function (response) {
            //       console.log("Test Successful ");
            //     })
            //     .catch(function (err) {
            //       console.log("Test Failed : \n",err);
            //     })
        }

    }

    // Write final content string to file test.js.
    fs.writeFileSync('test.js', content, "utf8");
    console.log("Exiting test generator");
}




// Export
module.exports = generateTestCases;