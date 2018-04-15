# DevOpsKnights

### Milestone 3: DEPLOYMENT
##### Deployment:  
* Created a production enviornment for iTrust and Checkbox.io on the Jenkins server.  
* Created git hooks for both iTrust and Checkbox.io to trigger deployment when pushed to "production".
* Deployed 5 iTrust instances and 2 Checkbox.io instance (Stable and Canary) on the DigitalOcean platform.
* Used ansible, playbooks and roles to automate all the processes.

##### Infrastructure Upgrade:
##### Canary Release:
##### Rolling Update:
* After deployment, when changes to iTrust are pushed to "production", the servers get updated using rolling update strategy. Each instance is reployed serially while the other 4 instances remain operational.
* Maintained a single MySQL instance on the Jenkins Server which was accessed by all the iTrust instances.
* Created a monitoring dashboard for tracking active instances and rolling updates. (We created a Github repo [ItrustMonitoring](https://github.com/pushpendrasp/ItrustMonitoring) containing Node JS scripts for this purpose).

#### Screencast
* [iTrust](): Deployment, Rolling Update and Monitoring
* [Checkbox](): Deployment, Infrastructure Upgrade and Canary Release