var fs = require('fs'),
    xml2js = require('xml2js'),
    child  = require('child_process');
var parser = new xml2js.Parser();
var Bluebird = require('bluebird')
var execSync = require('child_process').execSync;

var k=0;
var index = 0;
var junitResults =  execSync(`cd /fuzz/containers && ls *.xml`);
var Report = [];
var totalCases = 0;
var output = [];

var finalOutput = priority(junitResults);

finalOutput.then(function(result){
    result.sort(function (x,y) {
    var n = x.status - y.status;
    if (n !== 0) {
        return n;
    }
    return y.time - x.time;
    });
    console.log("total: ", totalCases);
    result.forEach(e => e.time /= totalCases);
    console.log(result);
    const content = JSON.stringify(result,null,' ');
    fs.writeFileSync('/fuzz/finalOutput',content);
});

async function priority(junitResults)
{
    try{
        var result = junitResults.toString().trim().split('\n');
        result.forEach(function(junitResult){
            totalCases += 1;
            Report = calculatePriority(junitResult);
        });
    }catch(e){}
    return Report;
}

function readResults(result, index)
{

    var testcase = [];
    var op = [];
    try{
    for( var i = 0; i < result.result.suites[0].suite.length; i++ )
    {

        testcase = result.result.suites[0].suite[i];

        for(var j=0;j < testcase.cases[0].case.length; j++){
            op = testcase.cases[0].case[j];
            if(index === 0) {
                output.push({
                    name: op.testName.join(),
                    time: parseFloat(op.duration),
                    status: op.hasOwnProperty('errorStackTrace') ? -1 : 1
                });
            }
            else{
                var temp = op.hasOwnProperty('errorStackTrace') ? -1 : 1;
                output[k].time += parseFloat(op.duration);
                output[k].status += temp;
            }
            k++;
        }

    }}catch(err){   console.log(err)   }
    return output;
}

async function calculatePriority(testReport)
{
    try{
        var contents = fs.readFileSync(testReport);
        let xml2json = await Bluebird.fromCallback(cb => parser.parseString(contents, cb));
        var tests = readResults(xml2json,index);
        index++;
        k=0;
    }catch(e){}
    return tests;
}