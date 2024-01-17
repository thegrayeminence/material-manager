
# ProxyShader: Generate Placeholder Materials for PBR Workflows 
>render texture maps for your materials procedurally or via AI prompts and pre-existing assets; configure your materials’ structure; and preview your materials in the browser before 


## The Problem:

## The Solution:

## Built With:

## Getting Started:

### User Instructions:

### Developer Instructions:

### Prerequisites:

#### Main Frameworks:
- Frontend:
  - React JS/Chakra UI
- Backend:
  - Python/Flask/SqlAlchemy

#### Javascript Dependencies/Libs:
```json
  "dependencies": {
    "@chakra-ui/react": "^2.8.2",
    "@emotion/react": "^11.11.3",
    "@emotion/styled": "^11.11.0",
    "@react-three/drei": "^9.93.0",
    "@react-three/fiber": "^8.15.13",
    "@tanstack/react-query": "^5.17.9",
    "axios": "^1.6.5",
    "chakra-react-select": "^4.7.6",
    "framer-motion": "^10.17.9",
    "latest": "^0.2.0",
    "maath": "^0.10.7",
    "react": "^18.2.0",
    "react-color": "^2.19.3",
    "react-dom": "^18.2.0",
    "react-dropzone": "^14.2.3",
    "react-hook-form": "^7.49.3",
    "react-hook-form-chakra": "^1.0.2",
    "react-iframe": "^1.8.5",
    "react-query": "^3.39.3",
    "react-router-dom": "^6.21.1",
    "sass": "^1.69.7",
    "styled-components": "^6.1.8",
    "three": "^0.160.0",
    "zustand": "^4.4.7"
  },
  "devDependencies": {
    "@hookform/devtools": "^4.3.1",
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "eslint": "^8.55.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "vite": "^5.0.11"
  }

```


```js
[packages]
SQLAlchemy = "==1.4.49"
flask = "==2.2.2"
flask-sqlalchemy = "==3.0.3"
flask-migrate = "==4.0.0"
flask_cors = "*"
flask-restful = "*"
psycopg2-binary = "*"
sqlalchemy-serializer = "==1.4.1"
importlib-metadata = "==6.0.0"
importlib-resources = "==5.10.0"
flask-bcrypt = "==1.0.1"
Werkzeug = "==2.3.6"
requests = "*"
faker = "*"
replicate = "*"
```

### Main Frameworks:

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
- Sign up for account on [Replicate](https://replicate.com), generate an API token, and store the token's text locally in .env and then reference the token's value in the main app.py file 
- To find new models/forked versions of Stable Diffusion, visit Replicate's site and import them into the app.py's replicate.run(...) function to create surprising results; just make sure the new models' input and ouput schema match those used in the code!

### Credits & Acknowledgements:
+ Textures generated w/ [Stable Diffusion AI](https://replicate.com/stability-ai/stable-diffusion) via [Replicate API](https://replicate.com)
+ Landing page procedural animation made by [Mark Boots](https://codepen.io/MarkBoots)