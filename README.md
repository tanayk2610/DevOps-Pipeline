# DevOpsKnights

Prerquisites:

1. Need a folder called sync_folder in your VM (Typically the shared folder between host and VM)

   (This is where the inventory file is created).

2. Need a DOTOKEN environment variable set to the Digital Ocean token

3. Need ANsible installed.


How to run:

ansible-playbook Jenkins_build/main.yml -u root
## Jenkins Configuration  
### Issues faced:  
1. Bypassing the jenkins server to install plugins.  
## Building iTrust   
### Issues faced:    
1. Setting the admin password for mysql databases in the db and hibernate files.   
2. Running itrust on ubuntu/trusty64.

## Jenkins Job Builder   
### Issues faced:    
1. Finding the most appropriate way to implement the job builder tasks.
2. Writing yaml script for job builder.  
3. Creating a post build action for the job builder.   
4. Configuring the access of job builder to the jenkins server.   

