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
    execSync("cd ~/iTrust2-v2 && git stash");
    execSync("cd ~/iTrust2-v2 && git checkout stash -- .");
    execSync('cd ~/iTrust2-v2 && git commit -m "Fuzzer commit on ' + 'Build number: ' + number + '"');
    execSync("cd ~/iTrust2-v2 && git stash drop");
}


function triggerJenkinsJobBuilder(number)
{
    console.log("Triggering Jenkins Job Builder for :" + number);
    // Command
    execSync("cd ~/iTrust2-v2/iTrust2 && mvn process-test-classes")
    // execSync("curl -X POST http://devopsknights:devops123@localhost:8080/job/fuzzer/build -H "+ crumb);
}

var fuzz = function (iterations)
{
    var javaFiles = getJavaFiles("~/iTrust2-v2/iTrust2/src/main/java/edu/ncsu/csc/itrust2");
    execSync("cd ~/iTrust2-v2 && git checkout master && git branch -D fuzzer");
    execSync("cd ~/iTrust2-v2 && git branch fuzzer");
    // var masterSHA = getSHA('master');
    var JENKINS_USER = "devopsknights", JENKINS_PASSWORD = "devops123";
    var github_user = execSync("echo $GITHUB_USER");
    var github_email = execSync("echo $GITHUB_EMAIL");
    execSync(`git config --global user.name "${github_user}"`);
    execSync(`git config --global user.email "${github_email}"`);
    // var crumb = execSync("curl -s 'http://devopsknights:devops123@localhost:8080/crumbIssuer/api/xml?xpath=concat(//crumbRequestField,\":\",//crumb)'");
    execSync("cd ~/iTrust2-v2 && git checkout fuzzer");
    while(iterations-- > 0)
    {
        //Revert back to the Original
        // revertBack(masterSHA);
        // execSync("cd ~/iTrust2-v2 && git revert HEAD");
        // For each file call mutate to perform random changes
        execSync("cd ~/iTrust2-v2 && git reset HEAD");
        javaFiles.forEach(function (file){
            fuzzer.mutate(file);
        });
        
        // Commit the changes
        commitChanges(iterations);

        // Trigger Jenkins Job Builder for this commit on 'fuzzer' branch
        triggerJenkinsJobBuilder(iterations);
    }
}

fuzz(5)


