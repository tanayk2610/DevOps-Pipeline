# DevOpsKnights

## Fuzzer and test prioritization:    
We firstly, cloned iTrust in the *itrust2 jenkins job* and built it there. Only when it was successfully built, then we run the fuzzer jobs. We fuzze the itrust repo in which we had cloned in the itrust2 job's workspace. Then we copy the fuzzed repo to the workspace of the *fuzzer jenkins job*. On this job we build and test the repo and its changes.   
To fuzze we firstly generate random numbers that select the *java* files from the list of all the files to be fuzzed. These files are then fuzzed randomly based on certain probability for the cases that were specified in the task.   
After the fuzzing has been done, we commit the changes. This commit then triggers the *post-commit* hook that copies the fuzzed repo into the fuzzer job's workspace and runs the the fuzzer job. The job, builds and tests the repo.   
In the post build action the *jacoco* reports are generated for studying the code coverage. The jacoco reports generate the test cases in *xml* files in surefire-reports directory in the target directory. We also used the *junit* plugin in jenkins post build to generate a single xml file for all the unit tests. This helped simplify the test prioritization task.   
Using the reports from the junit plugin, after running the fuzzing and building a *100 times* we recorded the number of passes/failures along with the time taken in all these cases for each individual test case. Using these statistics, we sorted the test cases, by adding +1 for success and -1 for failure. The tests were arranged in a list by ordering failures above passed. Amongst the cases with same pass-fail score, they were sorted in a descending order based on their average time. Hence the test cases with the most priority are the ones that failed the most number of times with the highest average time.   
   
## Problems discovered:    
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
We want to analyze and improve the failed test cases so as to improve our code. Hence we rank the failed test cases above the passed ones. The passed ones are not of our primary concern. Then even amongst the test cases that have equal pass-fail count, we give higher preference to the ones that took higher time as test cases with larger time are of more concern than the ones that execute in less time. We can improve our code so as to be faster by analyzing these test cases. 
