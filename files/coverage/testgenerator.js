//import { insertStudy, insertVote } from './db.js';

// Core/NPM Modules
const fs = require("fs");
// const db = require('./db.js');

// var id1 = null, id2 = null;

/**
 * Generate test cases based on the global object constraints.
 *
 * @param {String} filepath            Path to write test file.
 * @param {Object} constraints          Constraints object as returned by `constraints`.
 */

exports.generateTestCases = function (filepath, constraints) {
    // db.insertStudy();
    // db.insertVote();
    var token1 = 1, token2 = 2, token3 = 3, invteCodeStr = "RESEARCH",
        id1 = "5aa555a55555555555555a55", id2 = "1aa111a11111111111111a11", id3 = "2aa222a22222222222222a22",
        id4 = "1zz111z11111111111111z99", id5 = "2aa222a22222222222222a99",
        voteId1 = "5xx555x55555555555555x55", voteId2 = "5zz555z55555555555555z55", voteId3 = "1zz111z11111111111111z11"

    // Content string. This will be built up to generate the full text of the test string.

    let content1 = `const needle = require('needle');
    var faker = require('faker');
    var studyObj1 = 
{
    "name":"fheiafhazn",
    "description":"frejhtkjwavbsjdy298qywhsila",
    "studyKind":"dataStudy",
    "researcherName":"ABS",
    "contact":"a@b.cl",
    "awards":null,
    "awardOptions":[
        "Amazon Gift Card",
        "Github Swag",
        "BrowserStack",
        "Windows Surface RT",
        "iPad Mini",
        "Other",
        "None"
    ],
    "status":"open",
    "goal":"100",
    "invitecode":"RESEARCH",
    "markdown":"abc",
    "token":"1",
    "adminLink":"/studies/admin/?token=e5335bf1a54bf0f1a1144ff1b856e012b950a5a9bdcef21edd0f28dfa98bf2ca9b89a6f3cbd278c91439d937a11d5b41",
    "publicLink":"/studies/?id=5aaef796e96045070ea73042"
}

var studyObj2 = 
{
    "name":"fheiafhazn",
    "description":"frejhtkjwavbsjdy298qywhsila",
    "studyKind":"survey",
    "researcherName":"ABS",
    "contact":"a@b.cl",
    "awards":null,
    "awardOptions":[
        "Amazon Gift Card",
        "Github Swag",
        "BrowserStack",
        "Windows Surface RT",
        "iPad Mini",
        "Other",
        "None"
    ],
    "status":"open",
    "goal":"100",
    "invitecode":"RESEARCH",
    "markdown":"abc",
    "token":"2",
    "adminLink":"/studies/admin/?token=e5335bf1a54bf0f1a1144ff1b856e012b950a5a9bdcef21edd0f28dfa98bf2ca9b89a6f3cbd278c91439d937a11d5b41",
    "publicLink":"/studies/?id=5aaef796e96045070ea73042"
}

var studyObj3 = 
{
    "name":"fheiafhazn",
    "description":"frejhtkjwavbsjdy298qywhsila",
    "studyKind":"dataStudy",
    "researcherName":"ABS",
    "contact":"a@b.cl",
    "awards":null,
    "awardOptions":[
        "Amazon Gift Card",
        "Github Swag",
        "BrowserStack",
        "Windows Surface RT",
        "iPad Mini",
        "Other",
        "None"
    ],
    "status":"open",
    "goal":"100",
    "invitecode":"TEST",
    "markdown":"abc",
    "token":"3",
    "adminLink":"/studies/admin/?token=e5335bf1a54bf0f1a1144ff1b856e012b950a5a9bdcef21edd0f28dfa98bf2ca9b89a6f3cbd278c91439d937a11d5b41",
    "publicLink":"/studies/?id=5aaef796e96045070ea73042"
}

voteObj = {
    "_id": "5xx555x55555555555555x55",
    "studyId": "5aa555a55555555555555a55",
    "timestamp": "",
    "answers": [
    {
        "question":1,
        "kind":"multichoice",
        "answer":[
            "0"
        ]
    },
        {
            "question":2,
            "kind":"singlechoice",
            "answer":"0"
        },
        {
            "question":3,
            "kind":"singlechoicetable",
            "answer":{
                "3_0":"1",
                "3_1":"2",
                "3_2":"3",
                "3_3":"2"
            }
        },
        {
            "question":4,
            "kind":"multichoicetable",
            "answer":{
                "4_0":[
                    "2"
                ],
                "4_1":[
                    "2"
                ],
                "4_2":[
                    "2"
                ],
                "4_3":[
                    "2"
                ]
            }
        }
    ],
    "ip": faker.internet.ip(),
    "fingerprint": "2019582184",
    "email": faker.internet.email(),
    "contact": "false"
}
    `

    // Iterate over each function in constraints
    for (var i = 0; i < constraints.length; i++) {
        if (constraints[i].type === 'get') {
            if (constraints[i].paramName && constraints[i].paramName === 'id') {
                var api1 = `localhost:3002${constraints[i].api}` + '/' + id1;
                content1 += `try{
                needle.get("${api1}");\n
            } catch (e) {
                console.log(e);
            }
            `;
                var api2 = `localhost:3002${constraints[i].api}` + '/' + id2;
                content1 += `try{
                    needle.get("${api2}");\n
            } catch (e) {
                console.log(e);
            }
            `;
                var api3 = `localhost:3002${constraints[i].api}` + '/' + id3;
                content1 += `try{
                    needle.get("${api3}");\n
            } catch (e) {
                console.log(e);
            }
            `;
                var api4 = `localhost:3002${constraints[i].api}` + '/' + id4;
                content1 += `try{
                    needle.get("${api4}");\n
            } catch (e) {
                console.log(e);
            }
            `;
                var api5 = `localhost:3002${constraints[i].api}` + '/' + id5;
                content1 += `try{
                    needle.get("${api5}");\n
            } catch (e) {
                console.log(e);
            }
            `;
                var api6 = `localhost:3002${constraints[i].api}` + '/' + voteId1;
                content1 += `try{
                    needle.get("${api6}");\n
            } catch (e) {
                console.log(e);
            }
            `;
                var api7 = `localhost:3002${constraints[i].api}` + '/' + voteId2;
                content1 += `try{
                    needle.get("${api7}");\n
            } catch (e) {
                console.log(e);
            }
            `;
                var api8 = `localhost:3002${constraints[i].api}` + '/' + voteId3;
                content1 += `try{
                    needle.get("${api8}");\n
            } catch (e) {
                console.log(e);
            }
            `;
            }
            else if (constraints[i].paramName && constraints[i].paramName === 'token') {
                var api1 = `localhost:3002${constraints[i].api}` + '/' + token1;
                content1 += `try{
                    needle.get("${api1}");\n
            } catch (e) {
                console.log(e);
            }
            `;
                var api2 = `localhost:3002${constraints[i].api}` + '/' + token2;
                content1 += `try{
                    needle.get("${api2}");\n
            } catch (e) {
                console.log(e);
            }
            `;
                var api3 = `localhost:3002${constraints[i].api}` + '/' + token3;
                content1 += `try{
                    needle.get("${api3}");\n
            } catch (e) {
                console.log(e);
            }
            `;
            }
            else if (constraints[i].paramName == null) {
                var api = `localhost:3002${constraints[i].api}`;
                content1 += `try{
                    needle.get("${api}");\n
            } catch (e) {
                console.log(e);
            }
            `;
            }
        }
        if (constraints[i].type === 'post') {
            var api = `localhost:3002${constraints[i].api}`;
            if (api.indexOf("vote") === -1) {
                //   console.log(api);
                content1 += `try{
                    needle.post("${api}",studyObj1,{ json: true });\n
            } catch (e) {
                console.log(e);
            }
            `;
                content1 += `try{
                    needle.post("${api}",studyObj2,{ json: true });\n
            } catch (e) {
                console.log(e);
            }
            `;
                content1 += `try{
                    needle.post("${api}",studyObj3,{ json: true });\n
            } catch (e) {
                console.log(e);
            }
            `;
            }
            else {
                // console.log("vote present",api);
                content1 += `try{
                    needle.post("${api}",voteObj,{ json: true });\n
            } catch (e) {
                console.log(e);
            }
            `;
            }
        }
    }

    // Write final content string to file test.js.
    fs.writeFileSync('test.js', content1, "utf8");


}

// Export
// module.exports = generateTestCases;
