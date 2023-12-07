## Environment
Our code will be runnable in a machine that is running Ubuntu 20.04. 

Our code is deployed using [vercel](https://vercel.com/). 

## Dependencies

All dependencies for backend can be found in `backend/petpal/requirements.txt`

All dependencies for frontend can be found in `frontend/package.json`

## Setting up backend 

First, add .env file with following key value pairs: 

```
SECRET_KEY=<django secret key> 
DEBUG=<Debug mode or not> 
ALLOWED_HOSTS=localhost,127.0.0.1,.vercel.app

POSTGRES_USER=<User for PostgreSQL database>
POSTGRES_HOST=<Host of your PostgreSQL databse> 
POSTGRES_PASSWORD=<Password for your PostgreSQL database> 
POSTGRES_DATABASE=<Name of your PostgreSQL database> 

CLOUDINARY_NAME=<Name for your Cloudinary account> 
CLOUDINARY_API_KEY=<API key for your Cloudinary account>
CLOUDINARY_API_SECRET=<API secret key for your Cloudinary account>
```

Above environment variables for PostgreSQL and Cloudinary is only used when DEBUG=False. 
PostgreSQL provides the database and Cloudinary serves as a media file for deployed version. 
If DEBUG=True, SQLite with normal media folder is used instead of PostgreSQL and Cloudinary. 

You can signup/login https://cloudinary.com/ to get api keys for cloudinary. 

After setting up the environement variables, you can run the following command in the project directory to setup the backend: 
```
cd backend 
./startup.sh
```
If you get Permission Denied, do `chomd +x startup.sh`.

## Setting up frontend

First add .env file with `REACT_APP_API_URL=<API URL>`. 
For development, you can use `REACT_APP_API_URL=http://localhost:8000`. 
For deployment, you should replace with URL that you used for deploying backend (e.g. https://csc309-backend-petpal.vercel.app). 
To set up the frontend, run the following command from the project directory: 

```
cd frontend
npm i
```

## Running the code locally
After following the above steps, you can run our codes locally. 

First put `REACT_APP_API_URL=http://localhost:8000` in `.env` for frontend folder, and put DEBUG=True for `.env` in backend folder. 

Then, you can run the code for backend by running the following commands: 
```
cd backend/petpal
./run.sh
```
If you get Permission Denied, do `chomd +x run.sh`.

You can run the code for frontend by running the following commands: 
```
cd frontend
npm start
```

## Deployment
We deployed our work using vercel. 

To deploy you can first signup to vercel. 

You can install vercel CLI to deploy.  See detailed instruction for installing vercel here: https://vercel.com/docs/cli.

### Deploying backend using CLI
Run the follwoing commands: 
1. ``cd backend/petpal``
2. ``vercel``

Then follow the below image: 
![image](https://github.com/Kai15116/csc309-petpal/assets/65318176/70fee878-9aac-4d11-964d-5ef6e07cad55)

You can replace the project name with any other name. 

### Deploying frontend using CLI
First, change the `.env` in frontend folder so `REACT_APP_API_URL=<Deployed URL that you obtained above>`. 

Then, run the follwoing commands: 
1. ``cd frontend``
2. ``vercel``
Then follow the belowe image:
![image](https://github.com/Kai15116/csc309-petpal/assets/65318176/e22ec443-1ad6-46d4-aaa8-02cb6aaee04d)

You can replace the project name with any other name. 

### Alternative Option
You can also go to https://vercel.com/ and import GitHub this repo (or other GitHub repo that contains this code) to deploy. 

This is especially helpful if vercel CLI cannot be installed. 

In this case, you will create two projects with ``backend/petpal`` for backend project and ``frontend`` for frontend. 
Then, set the environment variables appropriately in the browser. 

This will deploy the website. 

### PostgreSQL
We used PostgreSQL database provided from vercel to get the keys we use for `.env` in backend. 

![image](https://github.com/Kai15116/csc309-petpal/assets/65318176/30e3c2eb-539a-4d2a-ae82-41b1da9302a1)

### Cloudinary
You can signup to https://cloudinary.com/ to get the keys we use for `.env` in backend. 



