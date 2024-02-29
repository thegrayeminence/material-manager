

<h1 style="text-align: center;"> Texture Forge </h1>

![LandingPage](static/documentation/landingpage_readmepic.png)

<details open="open">
<summary>Table of Contents</summary>

- [About](#about)
  - [Overview](#overview)
  - [Features](#features)
  - [Usage](#usage)
    - [How It Works:](#how-it-works)
  - [FAQ](#faq)
    - [What Is 'PBR'?](#what-is-pbr)
  - [Built With](#built-with)
    - [Primary Frameworks/Libraries Used:](#primary-frameworkslibraries-used)
- [Installation/Setup](#installationsetup)
  - [Backend](#backend)
    - [For Setting Up Server Folder, Run The Following In Your Terminal:](#for-setting-up-server-folder-run-the-following-in-your-terminal)
    - [If you need to flush/reset the SQL database, run:](#if-you-need-to-flushreset-the-sql-database-run)
  - [Frontend](#frontend)
    - [For Setting Up the Client Folder:](#for-setting-up-the-client-folder)
    - [For configuring Stable Diffusion/Replicate Client](#for-configuring-stable-diffusionreplicate-client)
    - [Important Env Variables](#important-env-variables)
- [Prerequisites](#prerequisites)
    - [Frontend Dependencies:](#frontend-dependencies)
    - [Backend Dependencies:](#backend-dependencies)
- [Roadmap](#roadmap)
    - [...COMING SOON!](#coming-soon)
- [Acknowledgements](#acknowledgements)
- [License](#license)

</details>

---

## About
### Overview

[Texture Forge](https://textureforgestatic.onrender.com/)  utilizes user input (via a series of elements on the site's form) to generate text prompts that are sent to Stable Diffusion (an open-source generative AI system) to create texture maps, via text-to-image and image-to-image models, that can be easily downloaded and imported into the user's 3D program/software of choice. 

Users can quickly generate their desired PBR textures via a series of prompts, preview them in the browser once they load, download them (with optimal naming conventions/file-structure for ease-of-use), then import their newly generated texture maps into their rendering engine of choice (and connect each map in the shader's console/node tree as they normally would). The platform thus provides a handy, time-saving tool for Game Developers, 3D/VFX artists/etc.--specifically those whose projects are still in the early stages of development (e.g. previz, playblasts, or rough renders where the prioritization of speed and low-impact assets over photorealistic lighting is desirable.)


### Features
1. Generate Texture Maps
	- Generate texture maps for your 3D projects and PBR materials, using text-to-image and image-to-image AI models with Stable Diffusion
<img src="static/documentation/form_readmepic.png" alt="drawing" width="400"/>

2. Live Previews of Materials
	- Preview the generated texture maps and PBR materials in the browser to see how they look in real-time
<img src="static/documentation/gallerydetails_readmepic.png" alt="drawing" width="400"/>

3. Community Materials Gallery
	- Browse through a gallery of materials generated by other users and download them for your projects
 <img src="static/documentation/gallery_readmepic.png" alt="drawing" width="400"/>

4. Optimized Downloads
	- Download the generated texture maps using filenames and folder structure optimized for your workflow


### Usage
#### How It Works:

1. User describes/classifies the properties of the material they want generated via the inputs on the site's form               
2. TextureForge sends user descriptions to backend, stores them in the database, and then turns them into prompts optimally formatted for Stable Diffusion AI <br>
3. TextureForge sends prompts to Stable Diffusion to generate the first texture map (Albedo/BaseColor), using a text-to-image model <br>
4. SD outputs Albedo/BaseColor texture map as a url; TextureForge stores url in database and sends it to frontend for user preview/download <br>
5. TextureForge sends Albedo/BaseColor texture map to SD to generate the rest of the PBR texture maps (normal, roughness, height, etc.), using an image-to-image model this time <br>
6. SD outputs PBR texture maps as urls; TextureForge stores urls in database and sends them to frontend for user to preview/download <br>
7. Generated texture maps are loaded in browser for user to preview; user downloads new assets, zipped into folder with optimal file structure/naming, and then imports them/uses them however they want!

### FAQ
#### What Is 'PBR'?
PBR stands for Physically Based Rendering. It's a technique used in computer graphics to render images that mimick the laws of optics and closely resemble the material properties of real-life surfaces. The core idea behind PBR is to ensure that objects interact with light in a realistic manner, making digital scenes look more believable in a diverse range of lighting conditions.

PBR uses algorithms (based on real-world equations) to process a set of textures/bitmaps (each analogous to different optical phenomena) to reflect how materials absorb/reflect/refract/scatter/etc light. This can involve:

**Base Color**: Captures the true color of a material without shadows or reflections.<br>
**Roughness**: Determines the surface's microtexture, influencing how it scatters light.<br>
**Metallic**: Define the material's metallic attributes, differentiating between metallic and non-metallic surfaces. <br>
**Ambient Occlusion**: Simulates how light is occluded in crevices and corners.<br>
**Normal/Height Maps**: Add surface detail by simulating additional geometry. <br>

By applying this combination of real-world equations and standardized bitmaps, PBR materials can achieve consistent results under different lighting conditions, making them the current standard in creating photo-realistic 3D renders.

### Built With
#### Primary Frameworks/Libraries Used:
- Frontend:
  - Main: ReactJS
  - Styling/Styled Components: ChakraUI, SCSS
  - Other Functionality: 
    - State Management: Zustand
    - Requests/Responses/Forms: React Hook Forms, Axios
    - Routing: React Router
    - API/AI: Replicate, Stable Diffusion
- Backend:
  - Main: Python, Standard Library, Flask, SQLAlchemy
  
For complete list of dependencies and libraries used, see prerequisites section below.

---

## Installation/Setup

### Backend

#### For Setting Up Server Folder, Run The Following In Your Terminal:

   ```shell
   
   ## to install dependencies and start postgre:
   brew services start postgresql
   cd server
   pipenv install && pipenv shell ##can also run:'pip install -r requirements.txt to install dependencies'
   
   ## to define variables for flask APP session (optional):
   export FLASK_APP=app.py && 
   export FLASK_RUN_PORT=3001 && 
   export FLASK_DEBUG=1
   
   ## to define postgresql URI (should also be defined in .env)
   export DATABASE_URL='postgresql://username:password@hostname/dbname'
   
## to initialize the db/upgrade it based on most recent changes/run flask APP:
   flask db init
   flask db upgrade
   flask run
   ```

#### If you need to flush/reset the SQL database, run:

   ```shell
   # in a separate terminal tab, run:
   brew services start postgresql
   psql postgres
   
   \l # can use '\l' if you need to look up your db's name; then, run:
   
   DROP DATABASE your_database_name;
   CREATE DATABASE your_new_database_name;
   
   # then, back in your server folder, run:
   flask db init
   flask db migrate
   flask db upgrade
   ```

### Frontend

#### For Setting Up the Client Folder:
   ```shell
   cd client
   npm install
   
   ## if in dev mode, run:
   npm run dev
   
   ## if in deployment mode, run:
   npm start
   
   ## for full list of CLI commands and other important keywords/variables, see Vite's official documentation
   ```

#### For configuring Stable Diffusion/Replicate Client

- Sign up for account on [Replicate](https://replicate.com), generate an API token, and store the token's text locally in .env and then reference the token's value in the main app.py file 
- To find new models/forked versions of Stable Diffusion, visit Replicate's site and import them into the app.py's replicate.run(...) function to create surprising results; just make sure the new models' input and ouput schema match those used in the code!

#### Important Env Variables
Necessary Environment vars for setup are :

|         Name          |                  Description                  | Required |
| :-------------------: | :-------------------------------------------: | :------: |
|     `Secret Key`      |                      N/A                      |    ✅     |
| `REPLICATE_API_TOKEN` |            API Token for Replicate            |    ✅     |
|    `VITE_API_URL`     | frontend URL (for fetch requests/async stuff) |    ✅     |
|    `DATABASE_URL`     |         postgresql database host URL          |    ✅     |

--- 

## Prerequisites

#### Frontend Dependencies:
```json
  {
    "@chakra-ui/icons": "^2.1.1",
    "@chakra-ui/react": "^2.8.2",
    "@emotion/react": "^11.11.3",
    "@emotion/styled": "^11.11.0",
    "@fontsource/inter": "^5.0.16",
    "@fontsource/open-sans": "^5.0.22",
    "@fontsource/poppins": "^5.0.8",
    "@fontsource/raleway": "^5.0.16",
    "@react-three/drei": "^9.93.0",
    "@react-three/fiber": "^8.15.13",
    "@tanstack/react-query": "^5.17.9",
    "axios": "^1.6.5",
    "chakra-react-select": "^4.7.6",
    "d3": "^7.8.5",
    "framer-motion": "^10.17.9",
    "latest": "^0.2.0",
    "maath": "^0.10.7",
    "react": "^18.2.0",
    "react-color": "^2.19.3",
    "react-dom": "^18.2.0",
    "react-dropzone": "^14.2.3",
    "react-hook-form": "^7.49.3",
    "react-hook-form-chakra": "^1.0.2",
    "react-icons": "^5.0.1",
    "react-iframe": "^1.8.5",
    "react-query": "^3.39.3",
    "react-router-dom": "^6.21.1",
    "sass": "^1.69.7",
    "styled-components": "^6.1.8",
    "three": "^0.160.0",
    "zustand": "^4.4.7"
    }

```

#### Backend Dependencies:

```js
aiohttp==3.8.5
aiosignal==1.3.1
alembic==1.13.1
aniso8601==9.0.1
annotated-types==0.6.0
anyio==4.2.0
asttokens==2.4.1
async-timeout==4.0.3
attrs==23.1.0
backcall==0.2.0
bcrypt==4.1.2
blinker==1.7.0
certifi==2023.7.22
charset-normalizer==3.2.0
click==8.1.7
decorator==5.1.1
distlib==0.3.7
exceptiongroup==1.1.3
executing==2.0.1
filelock==3.12.2
Flask==3.0.0
Flask-Cors==4.0.0
Flask-Migrate==4.0.5
Flask-RESTful==0.3.10
Flask-SQLAlchemy==3.1.1
frozenlist==1.4.0
gunicorn==21.2.0
h11==0.14.0
httpcore==1.0.2
httpx==0.26.0
idna==3.4
importlib-metadata==7.0.0
importlib-resources==6.1.1
iniconfig==2.0.0
install==1.3.5
ipython==8.12.3
itsdangerous==2.1.2
jedi==0.19.1
Jinja2==3.1.2
keyboard==0.13.5
Mako==1.3.0
MarkupSafe==2.1.3
matplotlib-inline==0.1.6
multidict==6.0.4
openai==0.28.0
packaging==23.2
parso==0.8.3
pexpect==4.8.0
pickleshare==0.7.5
pipenv==2023.11.15
platformdirs==3.10.0
pluggy==1.3.0
prompt-toolkit==3.0.40
psycopg2-binary==2.9.9
ptyprocess==0.7.0
pure-eval==0.2.2
pydantic==2.5.3
pydantic_core==2.14.6
Pygments==2.16.1
pyperclip==1.8.2
pytest==7.4.3
python-dateutil==2.8.2
python-dotenv==1.0.1
pytz==2023.3.post1
replicate==0.22.0
requests==2.31.0
six==1.16.0
sniffio==1.3.0
SQLAlchemy==2.0.23
SQLAlchemy-serializer==1.4.1
stack-data==0.6.3
tomli==2.0.1
tqdm==4.66.1
traitlets==5.13.0
typing_extensions==4.8.0
urllib3==2.0.4
virtualenv==20.24.3
virtualenv-clone==0.5.7
wcwidth==0.2.9
Werkzeug==3.0.1
yarl==1.9.2
zipp==3.17.0

```

## Roadmap
#### ...COMING SOON!

## Acknowledgements
+ Textures generated w/ [Stable Diffusion AI](https://replicate.com/stability-ai/stable-diffusion) via [Replicate API's](https://replicate.com) Python [Client](https://github.com/replicate/replicate-python)
+ Background animations on website based on the works of: [Mark Boots](https://codepen.io/MarkBoots)

## License
This project is licensed under the [MIT License](http://opensource.org/licenses/MIT).
