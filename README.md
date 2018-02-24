# DevOpsKnights

#### Prerquisites:
* The machine on which this project is to be run should have the following applications installed:
	* Ansible
	* Dopy (using Python-pip)
* Following environment variables should be set up:
	* `DOTOKEN` - Digital Ocean token.
    * `MONGO_PORT` - MongoDB Port number.
    * `MONGO_IP` - IP on which MongoDB works.
    * `MONGO_USER` - Username for MongoDB
    * `MONGO_PASSWORD` - Password for MongoDB
    * `MAIL_USER` - E-mail id for SMTP  
    * `MAIL_PASSWORD` - Password for SMTP
    * `MAIL_SMTP` - SMTP mail client, for example `smtp.gmail.com`
    * `JENKINS_USER` - Username for Jenkins
    * `JENKINS_PASSWORD` - Password for Jenkins
    * `MYSQL_PASSWORD` - Password for MySQL
    * `GIT_TOKEN` - Git Token to clone the private NCSU repositories

#### Run instructions:

`ansible-playbook Jenkins_build/main.yml -u root`   

## Experiences and Learning:  
1. Learnt about the working of pipelines and their crucial role in automation.  


2. Applied the ansible scripting learnt during the homeworks and workshops. Learned more about roles, dynamically assigning and passing variables, etc


2. Learnt about Jenkins, its uses and working with it in an automatic setup.


3. Discovered the use of Jenkins job builder and how to use it for automating jenkins jobs and the pipeline. Particularly learnt how to create jenkins job builder files and using them to create jobs.


4. How idempotency helps in improving the efficiency of the project and reducing the time required in testing and building. 


5. Hard coding things creates many issues in moving code across platforms and especially in pipelines. We did the mistake to use hardcoded paths in out playbooks and templates, which in the end resulted in a lot of code modification when we ran our playbook on the Digital Ocean server.

## Issues faced:
### Understanding the project
1. Figuring out what to do and the set of steps that need to be performed.  
	Inital thought process: 
	[](initial.png)   
    Final plan:
    [](initial.png)   
    
    
2. Deciding which platform provider will be best suited for our need.   
	We had many options to choose from in the cloud platforms. Out of these we shortlisted AWS EC2 and Digital ocean platforms and then finalized DigitalOcean.
    
### Platform issues:  
1. Software version dependencies created issues while running the project. For example, digital ocean droplet provisioning works only with `dopy` version 3.5 and not even with the latest 3.7 version.
 
2. Accessing servers in the pipeline through ssh was a difficult task. However when these servers were accessed on a individual basis, it was a very task. The users for the ssh keys must be set correctly in the pipeline.

    
### Jenkins Configuration  
Bypassing the jenkins server to install plugins:

   We searched upon how to skip **"Unlock Jenkins"** part of the setup. The first solution was bypassing the process completely. But, this lead to Jenkins being unprotected. After, further research we learnt about `groovy` scripts that can create a new user and still bypass Unlock Jenkins but without compromising the security.



### Configuring jobs using Jenkins Job Builder     
1. Writing yaml scripts for job builder.


2. Finding the most appropriate way to implement the job builder tasks. 


3. Creating a post build action for the job builder -   
   This was the most difficult task. Using ansible plugins in post buid was not working and we had to do a lot of trial and error for resolving the issue
   
   
4. Configuring the access of job builder to the jenkins server.  


5. Issue in controlling the Jenkins Server which in turn was controlled by the ansible playbook from another server.


### Building iTrust      
1. Setting the admin password for mysql databases in the db and hibernate files.   
   Used configuration files for setting up passwords and other configuration information.
   
   
2. Running itrust on `ubuntu/trusty64`		
    We switched to xenial as there were a lot of security and configuration dependencies or trusty and it was creating a bottleneck in pipeline.


### Building Checkbox.io
1. Dealing with `nginx` configuration error - `500 Internal Server Error`	
	It turns out that we encountered this error because we hardcoded paths and did not provide appropriate permissions to the files that `nginx` was trying to access.

2. Permission issues for `public_html` in `nginx`		
   Changing the permissions of folders that nginx uses as the user who creates was `root` and user running the nginx was `jenkins`
   
3. Setting up MongoDB and its authentication	 
   When we switched to `mongodb_user` while debugging we faced some errors so we added `pymongo` package to use `mongodb_user` in our ansible scripts.

## References:

(https://www.digitalocean.com/community/tutorials/how-to-use-the-digitalocean-api-v2-with-ansible-2-0-on-ubuntu-16-04)

(https://www.digitalocean.com/community/tutorials/how-to-install-jenkins-on-ubuntu-16-04)

(http://docs.ansible.com/ansible/latest/jenkins_plugin_module.html)

NCSU stackoverflow channel and CSC519 Spring 18 Slack Channel
