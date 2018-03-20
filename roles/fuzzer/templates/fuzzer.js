var Random = require('random-js');
var fs = require('fs');
var sleep = require('sleep');
var shell = require('shelljs');
// var testAnalysis = require('./testAnalysis.js');
const execSync = require('child_process').execSync;
var iterations = 2;
// var tests = [];

var getJavaFiles = function () {
    var javaFiles = [];
    var path = "/var/lib/jenkins/jobs/itrust2/workspace/iTrust2-v2/iTrust2/src/main/java/edu/ncsu/csc/itrust2";
    var temp = [`ls ${path}/**/*.java`,`ls ${path}/controllers/**/*.java`,`ls ${path}/forms/**/*.java`,`ls ${path}/utils/*.java`,`ls ${path}/mvc/**/**.java`,`ls ${path}/controllers/api/**/**.java`,`ls ${path}/models/enums/*.java`];
    var files = execSync(`${temp[fuzzer.random.integer(0,6)]}`);
    console.log("files are: "+ files.toString());
    // console.log(typeof file);
    var javafiles = files.toString().trim().split("\n");
        javafiles.forEach(function(file){
            javaFiles.push(file);
        });

    return javaFiles;
}

var fuzzer = {
    random : new Random(Random.engines.mt19937().autoSeed(0)),

    seed: function (kernel)
    {
        fuzzer.random = new Random(Random.engines.mt19937(),seed(kernel));
    },

    mutate: function (filePath)
    {
        // console.log("Mutating file: " + filePath);
        var file = fs.readFileSync(filePath,'utf-8');
        var lines = file.split('\n');
        var tempFilePath = filePath + 'test';

        if(fs.existsSync(tempFilePath)) {
            fs.unlinkSync(tempFilePath);
        }
        lines.forEach( function (line) {

            // Change the content of the string
            if(fuzzer.random.bool(0.2) && line.match('\"(\\"|[^\"])*\"') && !line.match("//") && !line.match("@") && !line.match("final") && !line.match("jdbc"))
                line = line.replace(/\"(\\"|[^\"])*\"/g, '"' + fuzzer.random.string(10) + '"')

            //Replace '<' with '>' and '==' with '!=' and vice versa
            if( line.match("if") || line.match("while"))
            {
                if( !line.match("null") ){
                    if(fuzzer.random.bool(0.2) && line.match("=="))
                        line = line.replace('==','!=');
                    if(fuzzer.random.bool(0.2) && line.match("!="))
                        line = line.replace('!=','==');
                }
                if(fuzzer.random.bool(0.2) && line.match("<"))
                    line = line.replace('<','>');
                if(fuzzer.random.bool(0.2) && line.match(">"))
                    line = line.replace('>','<');
            }
            if( !line.match("case") ) {
                // Replace 0 with 1
                if(fuzzer.random.bool(0.2) && line.match('"((\\"|[^"])+0(\\"|[^"])*|(\\"|[^"])*0(\\"|[^"])+)"'))
                    line = line.replace('0','1');

                // Replace 1 with 0
                if(fuzzer.random.bool(0.2) && line.match('"((\\"|[^"])+1(\\"|[^"])*|(\\"|[^"])*1(\\"|[^"])+)"'))
                    line = line.replace('1','0');
            }
            fs.appendFileSync(tempFilePath, line + '\n');
        });

        fs.renameSync(tempFilePath, filePath);
    }
}

function commitChanges(number)
{
    console.log("#######################commit changes started#################################")

    execSync("cd /var/lib/jenkins/jobs/itrust2/workspace/iTrust2-v2 && git add .");
    execSync('cd /var/lib/jenkins/jobs/itrust2/workspace/iTrust2-v2 && git commit -m "Fuzzer commit on ' + 'Build number: ' + number + '"');
    execSync("cd /var/lib/jenkins/jobs/itrust2/workspace/iTrust2-v2 && git reset --hard HEAD~");

    console.log("#######################commit changes ended#################################")
}

function getSHA(param)
{
    return execSync("cd /var/lib/jenkins/jobs/itrust2/workspace/iTrust2-v2 && git rev-parse "+param).toString().trim();
}

var fuzz = function (num)
{
    var javaFiles = getJavaFiles();
    var fuzzSHA = getSHA('fuzzer');

    execSync("cd /var/lib/jenkins/jobs/itrust2/workspace/iTrust2-v2 && git checkout fuzzer");
    // console.log("branched checkout");
var i = 1;
    while( i <= num)
    {
        console.log("Build Number: "+i);

        execSync(`cd /var/lib/jenkins/jobs/itrust2/workspace/iTrust2-v2/iTrust2 && git checkout ${fuzzSHA}`);
        // console.log("reverting");
        javaFiles.forEach(function (file){
            fuzzer.mutate(file);

        });

        // sleep.sleep(200);
        // Commit the changes
        commitChanges(i);
        sleep.sleep(200);
        //test prori
        // testAnalysis.priority(tests,i)
        i++;
    }
    execSync(`cd /var/lib/jenkins/jobs/itrust2/workspace/iTrust2-v2/iTrust2 && git checkout ${fuzzSHA}`);
    // console.log("TEST REPORT \n "+ tests);
}

fuzz(iterations)
// exports.tests = tests;