# bookFilter
Install All dependencies before running the application

# Scripts README

This README file provides an overview of the available scripts and their functionalities for a project with the provided `scripts` configuration.

## Scripts

### dep

The `dep` script is used to install dependencies for both the backend and frontend parts of the project simultaneously. It uses the `concurrently` package to execute two separate `npm install` commands in parallel. The dependencies for the backend are installed using `npm install --prefix backend`, and the dependencies for the frontend are installed using `npm install --prefix frontend`.

To run the `dep` script, execute the following command:

```
npm run dep
```

### start

The `start` script is used to start the project by running the `index.js` file. This script assumes that the `index.js` file is the entry point for the application.

To start the project, execute the following command:

```
npm start
```

### server

The `server` script is used to start the backend server. It utilizes the `nodemon` package, which automatically restarts the server whenever changes are detected. The server script assumes that the backend code is located in a directory specified by the `--prefix backend` flag.

To start the backend server, execute the following command:

```
npm run server
```

### client

The `client` script is used to start the frontend development server. It assumes that the frontend code is located in a directory specified by the `--prefix frontend` flag. This script is typically used for local development and provides features such as live reloading.

To start the frontend development server, execute the following command:

```
npm run client
```

### dev

The `dev` script is used to concurrently run both the backend and frontend development servers. It utilizes the `concurrently` package to execute the `server` and `client` scripts simultaneously.

To start both the backend and frontend development servers, execute the following command:

```
npm run dev
```

## Conclusion

These scripts provide convenient shortcuts for various development tasks in the project. Refer to the instructions above to run each script based on your requirements.
