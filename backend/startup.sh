#!/bin/bash

# install python interpreter and pip
sudo apt install python3
sudo apt install python3-pip
sudo apt install python3-dev graphviz libgraphviz-dev pkg-config

# setup virtual environment
pip3 install virtualenv
virtualenv -p python3 venv
source venv/bin/activate
pip3 install --upgrade pip

# install all required python packages
pip3 install -r petpal/requirements.txt

# do migrations
cd petpal || exit
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py loaddata data.json

