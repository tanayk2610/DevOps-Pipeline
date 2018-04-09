#!/bin/bash
if [ ! -f /itrust_inventory ]; then
     ansible-playbook /files/itrust.yml && touch /itrust_inventory
else
    ansible-playbook /files/itrust_update.yml -i /files/itrust_inventory
fi
