var execSync = require('child_process').execSync;
copying();
function copying(){
    for(var i=1;i<2;i++)
    {
        execSync(`cp /var/lib/jenkins/jobs/fuzzer/builds/${i}/junitResult.xml /fuzz/containers/${i}.xml`);
    }
}