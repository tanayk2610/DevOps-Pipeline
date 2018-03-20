var fs = require('fs'),
    xml2js = require('xml2js'),
    child  = require('child_process');
var parser = new xml2js.Parser();
var Bluebird = require('bluebird')
var execSync = require('child_process').execSync;

var testReport =  execSync('ls /var/lib/jenkins/jobs/fuzzer/workspace/iTrust2-v2/iTrust2/target/surefire-reports/*.xml');
var resultee = [];

priority();
calculatePriority();
//findFlaky();


// async function findFlaky()
// {
//     var flakiness = {}
//     // for( var i = 0; i < 2; i++ )
//     // {
//       //  console.log(`iteration ${i}`);
//         try{
//           // build
//             child.execSync('cd simplecalc && mvn test');
//         }catch(e){}
//         var contents = fs.readFileSync(__dirname + testReport)
//         let xml2json = await Bluebird.fromCallback(cb => parser.parseString(contents, cb));
//         var tests = readResults(xml2json);
//
//         for(var x=0;x<tests.length;x++)
//         {
//             var t= tests[x];
//             if(!flakiness.hasOwnProperty(t.name))
//             {
//                 flakiness[t.name] = {
//                     passed: 0,
//                     failed: 0
//                 }
//             }
//             if(t.status == "passed")
//                 flakiness[t.name].passed++;
//             else
//                 flakiness[t.name].failed++;
//
//             // result.index.push({
//             //   "name": t.name,
//             //   "time": t.time,
//             //   "status": t.status
//             // });
//
//         }
//
//         //tests.forEach( e => console.log(i, e));
//
//     // }
//
//
//     for(var testName in flakiness)
//     {
//         var t = flakiness[testName];
//         var score= t.failed/(t.passed+t.failed);
//       //  console.log(`flakiness ${testName}: `+ score);
//     }
// }
async function priority()
{
    var reports = testReport.toString().trim().split("\n");
    reports.forEach(function(report){
      calculatePriority(report);
    });
}

function readResults(result)
{
    var tests = [];
    for( var i = 0; i < result.testsuite['$'].tests; i++ )
    {
        var testcase = result.testsuite.testcase[i];

        tests.push({
        name:   testcase['$'].name,
        time:   testcase['$'].time,
        status: testcase.hasOwnProperty('failure') ? "failed": "passed"
        });

        resultee.push({
          name:   testcase['$'].name,
          time:   testcase['$'].time,
          status: testcase.hasOwnProperty('failure') ? -1 : 1
        });
    }
    //console.log(tests);
    return tests;
}

async function calculatePriority(report)
{
    try{
        child.execSync('cd simplecalc && mvn test');
    }catch(e){}
      var contents = fs.readFileSync(__dirname + report)
      let xml2json = await Bluebird.fromCallback(cb => parser.parseString(contents, cb));
      var tests = readResults(xml2json);
      // sortjson(tests, 'status');
     tests.sort(function(a,b){
          if(a.status == "failed" && b.status == "passed") return -1;
          if(b.status == "failed" && a.status == "passed") return 1;
          if(a.status == b.status) return a.time - b.time;
          return a.time - b.time;
     });

   console.log("in pnsdcjsdnckjsd",resultee);

    // tests.forEach( e => console.log(e));
}

exports.resultee = resultee;
