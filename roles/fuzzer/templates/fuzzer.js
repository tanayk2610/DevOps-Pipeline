var Random = require('random-js');
var fs = require('fs');
var glob = require('glob');

const execSync = require('child_process').execSync;

var getJavaFiles = function (path) {
    var javaFiles = [];
    var files =  glob.sync(path + "/**/*.java");
    files.forEach(function(file){
        if(!file.match("/models/") && !file.match("/sql/") && !file.match("AddApptRequestAction")) {
            javaFiles.push(file);
        }
    })
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
        var file = fs.readFileSync(filePath,'utf-8');
        var lines = file.split('\n');
        var tempFilePath = filePath + 'test';
        
        if(fs.existsSync(tempFilePath)) {
            fs.unlinkSync(tempFilePath);
        }
        lines.forEach( function (line) {
            
            // Change the content of the string
            if(fuzzer.random().bool(0.3) && line.match('\"(\\"|[^\"])*\"') && !line.match("//") && !line.match("@"))
            line = line.replace(/\"(\\"|[^\"])*\"/g, '"' + fuzzer.random().string(10) + '"')
            
            //Replace '<' with '>' and '==' with '!=' and vice versa
            if( line.match("if") || line.match("while"))
            {
                if(fuzzer.random().bool(0.25) && line.match("=="))
                    line = line.replace('==','!=');
                if(fuzzer.random().bool(0.25) && line.match("!="))
                    line = line.replace('!=','==');
                if(fuzzer.random().bool(0.25) && line.match("<"))
                    line = line.replace('<','>');
                if(fuzzer.random().bool(0.25) && line.match(">"))
                    line = line.replace('>','<');
            }

            //Replace 0 with 1
            if(fuzzer.random().bool(0.3) && line.match('"((\\"|[^"])+0(\\"|[^"])*|(\\"|[^"])*0(\\"|[^"])+)"'))
            line = line.replace('0','1');

            // Replace 1 with 0
            if(fuzzer.random().bool(0.3) && line.match('"((\\"|[^"])+1(\\"|[^"])*|(\\"|[^"])*1(\\"|[^"])+)"'))
            line = line.replace('1','0');

            fs.appendFileSync(tempFilePath, line + '\n');
        });

        fs.renameSync(tempFilePath, filePath);
    }
}

function commitChanges(masterSHA, number)
{
    execSync("git stash");
    execSync("git checkout fuzzer");
    execSync("git checkout stash -- .");
    execSync('git commit -m "Fuzzer commit: '+ masterSHA + 'Build number: ' + number + '"');
    execSync("git push origin fuzzer");
    execSync("git stash drop");
}

function revertBack(masterSHA)
{
    var fuzzerSHA = getSHA('fuzzer');
    if(masterSHA != fuzzerSHA)
        execSync( "git checkout " + masterSHA);
}

function getSHA(params)
{
    return execSync("git rev-parse "+ param).toString().trim();
}

function triggerJenkinsJobBuilder(commitSHA)
{
    console.log("Triggering Jenkins Job Builder for " + commitSHA);
    // Command
    execSync("curl -X POST http://{{JENKINS_USER}}:{{JENKINS_PASSWORD}}@localhost:8080/job/fuzzer/build -H "+ crumb);
}

var fuzz = function (iterations)
{
    var javaFiles = getJavaFiles("~/iTrust2-v2/iTrust/src/main/java/edu/ncsu/itrust2");
    var masterSHA = getSHA('master');
    var crumb = execSync("curl -s 'http://{{JENKINS_USER}}:{{JENKINS_PASSWORD}}@localhost:8080/crumbIssuer/api/xml?xpath=concat(//crumbRequestField,\":\",//crumb)'");
    execSync("git checkout fuzzer");
    while(iterations-- > 0)
    {
        //Revert back to the Original
        revertBack(masterSHA);
        
        // For each file call mutate to perform random changes
        javaFiles.forEach(function (file){
            fuzzer.mutate(file);
        });
        
        // Commit the changes
        commitChanges(masterSHA, iterations);

        // Trigger Jenkins Job Builder for this commit on 'fuzzer' branch
        triggerJenkinsJobBuilder('fuzzer');
    }
}

fuzz(5)


