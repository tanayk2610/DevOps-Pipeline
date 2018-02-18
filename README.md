# DevOpsKnights

Prerquisites:

1. Need a folder called sync_folder in your VM (Typically the shared folder between host and VM)

   (This is where the inventory file is created).

2. Need a DOTOKEN environment variable set to the Digital Ocean token

3. Need ANsible installed.


How to run:

ansible-playbook Jenkins_build/main.yml -u root
