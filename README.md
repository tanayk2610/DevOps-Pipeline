# DevOpsKnights

### Milestone 3: DEPLOYMENT
##### Deployment:  
* Created a production enviornment for iTrust and Checkbox.io on the Jenkins server.  
* Created git hooks for both iTrust and Checkbox.io to trigger deployment when pushed to "production".
* Deployed 5 iTrust instances and 2 Checkbox.io instance (Stable and Canary) on the DigitalOcean platform.
* Used ansible, playbooks and roles to automate all the processes.

##### Infrastructure Upgrade:
* We created a Jenkins job that runs a playbook which automatically creates a master and 3 slave droplets and create a cluster of them. 
It then creates a deployment from dockerized version of checkbox images deployed on dockerhub.(Docker files submitted in code).

* We also created a redis server on kubernetes master and mirrored it to all thress slaves. 
For Demo we inserted a feature flag in Checkbox code that checks the feature flag called "Key" from redis and turns on and off the feature of creating a study.
Code Snippet:
```
exports.createStudy = function(req, res) {
	var flag = true;
	client.get("key", function(err,value){
		if(err){
			flag = "true";
		}
		else {
			flag = value;
		}
		if(flag==="true"){
			//Original Code of createStudy function
		}
		else {
			res.send("Feature not available!!!");
		}
	});
};

```


##### Canary Release:
* The deployment of Checkbox creates to deployments Stable and Canary. Stable has the original repo while canary has github repo that we created with modified code for distinguishing canary and stable. [checkbox-canary](https://github.ncsu.edu/ssgodbol/checkbox-canary)
* We created an infrastucure.js file which does the load balacing (similar to the workshop). It runs on Jenkins server itself.
* The load balncer forwards every 3rd request to Canary deployment(33.33%) and rest to Stable server. If Canary deployment gives an error, then it forwards all requests to Stable.
* A single instance of MongoDb was deployed on Jenkins server and both stable and canary deloyment use the same. 

##### Rolling Update:
* After deployment, when changes to iTrust are pushed to "production", the servers get updated using rolling update strategy. Each instance is reployed serially while the other 4 instances remain operational.
* Maintained a single MySQL instance on the Jenkins Server which was accessed by all the iTrust instances.
* Created a monitoring dashboard for tracking active instances and rolling updates. (We created a Github repo [ItrustMonitoring](https://github.com/pushpendrasp/ItrustMonitoring) containing Node JS scripts for this purpose).

#### Screencast
* [iTrust](https://youtu.be/q1dDyM4hrKY): Deployment, Rolling Update and Monitoring
* [Checkbox](https://drive.google.com/file/d/1Dtuwam4WuTMhvvZ_TqKVmwjSJDkQw_7m/view): Deployment, Infrastructure Upgrade and Canary Release

#### Contributions of Team Members:
* Pushpendra Singh Patel (ppatel16) - Deployment of iTrust and Checkbox and Rolling Update
* Sayali Godbole (ssgodbol) - Canary Release and Kubernetes Deployment
* Tanay Kothari (tkothar) - Kubernetes Deployment and Redis feature flag
* Uddhav Bhosle (ubhosle) - Rolling Update and Deployment of iTrust and Checkbox
