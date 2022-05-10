#!/bin/sh
echo "Ansible Entrypoint"

echo "[SPE-VM01]" >> /hosts
echo "roomallocbackend.ddns.net" >> /hosts

echo "[all:vars]" >> /hosts
echo "ansible_connection=ssh" >> /hosts
echo "ansible_user= $SSH_USER" >> /hosts
echo "ansible_ssh_user= $SSH_USER" >> /hosts
echo "ansible_python_interpreter=/usr/bin/python3.8" >> /hosts

echo "ansible_ssh_pass=$SSH_PASSWORD" >> /hosts
echo "ansible_become_pass=$SSH_PASSWORD" >> /hosts

echo "Entering the ansible using ansible-playbook"

ansible-playbook ansible/playbook.yml --user $SSH_USER
