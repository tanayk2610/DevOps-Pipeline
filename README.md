# DevOpsKnights

### Automated Commit Generation - Commit Fuzzer and Test Prioritization Analysis

##### Approach
As per the Milestone 1, we cloned the iTrust2-v2 repository in the iTrust2 workspace of the Jenkins and after the build is successful. We are creating a new fuzzer branch on oour forked iTrust2-v2 repo and checking out that branch and run the `fuzzer.js` using ansible playbook, now in this `fuzzer.js` file, we are listing all the *java* files which resides in the `/iTrust2/src/main/java/edu/ncsu/csc/itrust2` directory and store them in an array and then we are randomly generating a number between 1 and 88, which gives us how many files are we going to fuzz and the fuzzer randomly selects that number of files randomly from the list and start mutation on those files.  
After the fuzzer mutates the java files, it commits to the fuzzer branch and a `post-commit` hook gets called which copies the fuzzed repo into the fuzzer workspace and also triggers the fuzzer jenkins job and after the job is triggered we revert back to the original version. We have a sleep time of about 3 minutes between each commit because the when we were running the build jobs concurrently we were facing memory issue when running the 100 commits but it works well for few commits. The job, builds and tests the repo.   
In the post build action the ***JaCoCo*** reports are being generated for studying the code coverage. The jacoco reports generate the test cases in *xml* files in surefire-reports directory in the target directory.    
##### Analysis
We have used the ***JUnit*** plugin in jenkins post build action to generate a single xml file which combines the results of all the 46 test cases. This helped us to simplify the test prioritization task. As we just have to read through a single xml file for each build and then perform analysis on them all together once all the 100 commits have been made. In analysis, we read each file and look for all the `<testname>` to know which test is the data for, `<duration>` for each test and we look for `<errorStackTrace>` to check if the test has passed or failed. For every failed test there will be a `<errorStackTrace>` and we assign -1 for each fail test and +1 for each passed test. So for all the 100 xml files we keep updating the duration and the status and in the end, we take the average of all the duration and we get an integer for a status ranging between a minimum value of `-100` if it fails all the time and `100` if that test passed all the time.     

##### Problems discovered:    
- The test cases were not written so as to cover every possible condition and are hence flaky.  
- Certain changes to the logical conditions could lead to failures.   
- On changing certain strings, there are failures.
- Sometimes the build may go in infinite loops on making changes to certain java files.   
- If the code goes in *catch* part of try-catch code then we get errors.     
    
## Extending fuzzing operations in the future:  
- We could extend the fuzzing jobs to cover more cases, than logical operations, strings and 0-1 mutations.   
- We can try to make fuzze the code such that the corner cases are covered.  
- Using these fuzzing techniques we can create better test cases which can test the files in a more comprehensive way.   
- Finally the code can be improved so as to cover various test cases and corner cases along with different logical corner   
  
## Ranking of test cases:   
As we were analyzing our focus was more towards the failed test rather than the tests which passed because if we work through the failed tests then we can improve the code. Also we are sorting on the basis of the time it takes to run the test. So after all the 100 xml files have been analyzed and all the test cases value have been updated, we sort the test cases on the basis of the status in the order such as the test cases which have failed the most are listed on top of the list and for test cases having the same status value, we sort them on the basis of which test took more time than the other. This analysis will help the developer realizing what to improve and what not to worry about.
