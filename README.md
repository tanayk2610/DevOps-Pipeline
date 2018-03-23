# DevOpsKnights

### Automated Commit Generation - Commit Fuzzer and Test Prioritization Analysis

#### Approach  
Similar to Milestone 1, we setup a Jenkins server to run jobs to evaluate test coverage and peroforming builds for iTrust and Checkbox. We cloned the iTrust2-v2 repository in our Jenkins job's workspace and build it. After a successful build, we are creating a new fuzzer branch in the cloned repo and checking out that branch to run the `fuzzer.js` script using an ansible play. In this script, we are listing all the *java* files which reside at this path - `/iTrust2/src/main/java/edu/ncsu/csc/itrust2`. Then we store this list and randomly generate a number between 1 and 88, on the basis of which we select a random number of files from the list and start mutation on them.


After the fuzzer mutates the java files, it commits to the fuzzer branch and a `post-commit` hook gets called which copies the fuzzed repo into the fuzzer workspace and also triggers the fuzzer jenkins job. After the job is triggered we revert back to the original version. We have a sleep time of about 3 minutes between each commit because the when we were running the build jobs concurrently we were facing memory issues upon running 100 commits but it works well for few commits. The job builds and tests the repo.
In the post build action ***JaCoCo*** reports are being generated for studying the code coverage. The jacoco reports generate the test cases in *xml* files inside `target/surefire-reports`.

#### Analysis  
We have used the ***JUnit*** plugin in jenkins post build action of the job to generate a single xml file which combines results of all the 46 test cases that are run. This helped us to simplify the test prioritization task. Instead of reading all the 24 files that are created per build, we just have to read through a single xml file because of this plugin. We then perform analysis on all of them after 100 commits have been made. In analysis, we read each file and look for
1. `<testname>` tag - to find all test cases
2. `<duration>` tag - to find the time taken to execute a specific test; and
3. `<errorStackTrace>` tag - to check if the test has passed or failed.

For every failed test there will be a `<errorStackTrace>` and we assign `-1` for each failed test and `+1` for each passed test. So for all the 100 xml files we keep updating the duration and the status of the tests. In the end, we evaluate the average of all the durations to calculate average time to run a test and we get an integer for a status ranging between a minimum value of `-100` if it fails all the time and `100` if that test passed all the time.     

#### Problems discovered: 
- Certain changes to the logical conditions could lead to failures.   
- On changing certain strings, there are failures.
- Sometimes the build may go in infinite loops on making changes to certain java files.   
- If the code goes in *catch* part of try-catch code then we get errors.     
    
#### Extending fuzzing operations in the future:  
- We could extend the fuzzing jobs to cover more cases, than logical operations, strings and 0-1 mutations.   
- We can try to make fuzze the code such that the corner cases are covered.  
- Using these fuzzing techniques we can create better test cases which can test the files in a more comprehensive way.   
- Finally the code can be improved so as to cover various test cases and corner cases along with different logical corner   
  
#### Ranking of test cases:   
As we were analyzing our focus was more towards the failed test rather than the tests which passed because if we work through the failed tests then we can improve the code. Also we are sorting on the basis of the time it takes to run the test. So after all the 100 xml files have been analyzed and all the test cases value have been updated, we sort the test cases on the basis of the status in the order such as the test cases which have failed the most are listed on top of the list and for test cases having the same status value, we sort them on the basis of which test took more time than the other. This analysis will help the developer realizing what to improve and what not to worry about.

## Automated Test Generation, Testing and Coverage report for Checkbox.io

#### Step 1: Automated Test Generation Approach:

Similar to Test Generation workshop, we parsed the `server.js` file using Esprima to determine all the *API routes* to get the constraints.

Once we get the constraints, we create needle calls that cover all the *API* calls given in `server.js`.
We use below criterias to diffrentiate between the calls:
* Type of request, i.e. `GET` or `POST`.
* Parameters passed for `GET` requests, i.e., id, token etc.
* Data objects passed for `POST` requests, i.e., JSON object of the test data with structure similar to study collection or vote collection.

These test cases are then written to a `test.js` file.

#### Step 2: Coverage Reporting:

To get the coverage of all the routes that `server.js` uses, we use **`istanbul-middleware`** which hookss into require() in the server process and exposes coverage information on a special endpoint(e.g. /coverage).

So we start the coveraage server using `forever` which in turn starts the `server.js` by hooking to it via `require`.

#### Step 3: Testing

To test the possible scenarios, we insert test data in the database (Mongo DB) which checkbox.io uses.

Then we run the `test.js` generated in step 1.

All these steps are done using a simple ansible script.


##  Test coverage achieved
The Test generator created ***46*** test cases corresponding to various *API's*.

##  Coverage

Coverage for server.js : ***96.43 %***

Coverage for all the routes used by server.js : ***85.80%***

Coverage for most important route files accessed in server.js :
* `admin.js` : ***91.18%***
* `create.js` : ***95.65%***
* `study.js` : ***92.77%***
