var Random = require('random-js');
var fs = require('fs');
var glob = require('glob');

const execSync = require('child_process').execSync;

var getJavaFiles = function (path) {
    var javaFiles = [];
    var files =  glob.sync(path + "/**/*.java");
    console.log(files.toString());
    console.log(path);
    files.forEach(function(file){
            javaFiles.push(file);
    })
    console.log(javaFiles.toString());
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

function commitChanges(number)
{
    // console.log("#######################commit changes started#################################")

    execSync("cd /iTrust2-v2 && git stash");
    execSync("cd /iTrust2-v2 && git checkout stash -- .");
    execSync('cd /iTrust2-v2 && git commit -m "Fuzzer commit on ' + 'Build number: ' + number + '"');
    execSync("cd /iTrust2-v2 && git stash drop");

    // console.log("#######################commit changes ended#################################")
}

function getSHA(param)
{
    return execSync("cd /iTrust2-v2 && git rev-parse "+param).toString().trim();
}

var fuzz = function (iterations)
{
    var javaFiles = getJavaFiles();
    var fuzzSHA = getSHA('fuzzer');
    var crumb = execSync(`curl -s 'http://${JENKINS_USER}:${JENKINS_PASSWORD}@localhost:8080/crumbIssuer/api/xml?xpath=concat(//crumbRequestField,":",//crumb)'`);
    
    execSync("cd /iTrust2-v2 && git checkout fuzzer");
    // console.log("branched checkout");
    
    while(iterations-- > 0)
    {
        console.log("Build Number: "+iterations);

        execSync(`cd /iTrust2-v2 && git checkout ${fuzzSHA}`);
        // console.log("revertinggggggggg");
        javaFiles.forEach(function (file){
            fuzzer.mutate(file);
        });

        // console.log("calling fuzzer");
        
        // Commit the changes
        commitChanges(iterations);

    }
}

fuzz(10)
