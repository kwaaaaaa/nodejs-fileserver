# TRI File Server Challenge

* By Kwa Tran

# Objectives

1. Server functions:
    1. Upload a file (Content-Type: multipart/form-data)
    2. Delete a file
    3. List files
2. Web UI
3. CLI

* Proving correctness of the code (and ensuring each module works the others)
* Error handling and bad inputs
* UI, CLI Design, ease of use
* Project tooling and reproducible builds

# This Stack

1. Server - NodeJS Express
2. Web UI - React
3. CLI - NodeJS

# Testing Instructions

* Dependencies - Need NodeJS and NPM installed. Will need admin access to enable the CLI.
* After cloning / copying files. Run these commands:
```bash
# start server
cd server
npm install
npm start
# start web ui
cd ../client
npm install
npm start
# start cli
cd ../cli
npm install
sudo npm link
# test cli and server with test script from cli project
npm run test
# test cli commands
fs-store --help
fs-store --upload --path cli.js
fs-store --list
fs-store --delete --name cli.js
# test web ui
sensible-browser http://lcoalhost:3000
```

# Questions

1. Correctness of code
    * Ideally, I would unit-test the business logic. Logic for file server is abstracted out so it should be unit-testable if the project grows
    * You can quickly test the server using the CLI. This can be integrated into a deployment script.
    * Typescript is used to enable static typing which made refactoring easier and will scale the app better if it were to grow
2. Error Handling / Bad inputs
    * Error handling provided through the server with the ErrorMessage class
    * Erorr handling provided when the file already exists
    * The server will reject large files without an error message, so this is handled via the client. I set a 50mb limit which is found in server/index.ts
3. Ease of Use
    * As the reqs are straight forward, I hope it's easy to use
    * More features could be added with user feedback
4. Project tooling
    * As entire project relies only on javascript/typescript, any NodeJS environment should be able to serve this project.

# Notes

* The cli and server share a .ENV file. You can copy the .env.sample file in the /server folder to change the location of where files are stored
* The server will store files to the local machine, but this can be swapped out using the /server/src/services IStorage interface.
* You can run tests with the cli project using `npm run test` which will upload, delete, and list files. Red font will show if there is an error.