# Intro/Overview

### User Instructions:


### Dev Instructions (for running site on localhost):
#### Backend:
Terminal commands for setup:
1. brew services start postgresql
2. cd server
3. pipenv install && pipenv shell
4. export FLASK_APP=app.py && export FLASK_RUN_PORT=3001 && export FLASK_DEBUG=1
5. export DATABASE_URL='postgresql://materialMaker:luthien@localhost:5432/materialsdb'
6. flask db upgrade (if upgrades to db pending)
7. flask run

If flushing/reinitializing sql db is necessary, run:
1. run postgreSQL and connect to postgreSQL CLI:
   1. brew services start postgresql
   2. psql postgres
2. drop db table + create new one
   1. DROP DATABASE your_database_name;
   2. CREATE DATABASE your_new_database_name;





#### Frontend:
1. cd client
2. npm install
3. npm run dev
   
### Credits:
Uses following AI models for texture generation, most of which are forks of Stable Diffusion: