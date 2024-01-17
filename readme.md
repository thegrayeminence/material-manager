
# ProxyShader: Generate Placeholder Materials for PBR Workflows 
>render texture maps for your materials procedurally or via AI prompts and pre-existing assets; configure your materials’ structure; and preview your materials in the browser before 


## The Problem:

## The Solution:

## Built With:

## Getting Started:

### User Instructions:

### Developer Instructions:

### Prerequisites:
  + Packages:
### Server/Client Setup:

#### Run The Following In Your Terminal:

   ```shell
   brew services start postgresql
   cd server
   pipenv install && pipenv shell
   export FLASK_APP=app.py && export FLASK_RUN_PORT=3001 && export FLASK_DEBUG=1
   export DATABASE_URL='postgresql://username:password@hostname/dbname'
   flask db upgrade
   flask run
   ```

#### If you need to flush/reset the database, run:

   ```shell
   brew services start postgresql
   psql postgres
   DROP DATABASE your_database_name;
   CREATE DATABASE your_new_database_name;
   ```

##### For Setting up the frontend, run:
   ```shell
   cd client
   npm install
   npm run dev
   ```
#### For configuring Stable Diffusion/Replicate Client:


### Credits & Acknowledgements:
+ Textures generated w/ [Stable Diffusion AI](https://replicate.com/stability-ai/stable-diffusion) via [Replicate API](https://replicate.com)
+ Landing page procedural animation made by [Mark Boots](https://codepen.io/MarkBoots)