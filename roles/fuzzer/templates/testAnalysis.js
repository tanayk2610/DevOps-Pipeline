var fs = require('fs'),
    xml2js = require('xml2js'),
    child  = require('child_process');
var parser = new xml2js.Parser();
var Bluebird = require('bluebird')
var execSync = require('child_process').execSync;

var output = [];

async function priority(tests,iterations)
{
    try{
        while(iterations-- > 0 )
        {
            var testReport =  execSync('ls /var/lib/jenkins/jobs/fuzzer/workspace/iTrust2-v2/iTrust2/target/surefire-reports/*.xml');
            var reports = testReport.toString().trim().split("\n");
            reports.forEach(function(report){
            console.log(report);
                calculatePriority(report);
        });
}
        } catch(e) {}

}

function readResults(result)
{
    for( var i = 0; i < result.testsuite['$'].tests; i++ )
    {

        var testcase = result.testsuite.testcase[i];
        if(iterations == 1){
            tests.push({
                name:   testcase['$'].name,
                time:   testcase['$'].time,
                status:   testcase.hasOwnProperty('failure') ? -1 : 1
            });
        }
        else{
            var timer = tests[i].time + tests.testcase['$'].time;
            var testStatus = test[i].status + tests.testcase.hasOwnProperty('failure') ? -1 : 1
            tests.push({
                name:   testcase['$'].name,
                time:   timer,
                status: testStatus
            });

        }
    }
  console.log(tests);
    return tests;
}

async function calculatePriority(report)
{
    try{
    var contents = fs.readFileSync(report)
      let xml2json = await Bluebird.fromCallback(cb => parser.parseString(contents, cb));
      var testing = readResults(xml2json);
      // sortjson(tests, 'status');
     testing.sort(function(a,b){
          if(a.status == "-1" && b.status == "1") return -1;
          if(b.status == "-1" && a.status == "1") return 1;
          if(a.status == b.status) return a.time - b.time;
          return a.time - b.time;
     });
    }catch(e){}
}
exports.priority = priority;