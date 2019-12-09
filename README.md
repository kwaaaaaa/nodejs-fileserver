# TRI File Server Challenge

* By Kwa Tran
* Developed on Ubuntu 18.04, tested on latest MacOS and Windows 10
* Disclaimer: I had a lot of issues with testing on Windows. It worked with some workarounds with npm. This is a general issue I have with NodeJS projects on Windows.

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
# if this doesnt work (like on windows), run the app without nodemon
npm run start2
# start web ui on new terminal
cd ../client
npm install
npm start
# start cli
cd ../cli
npm install
# note on windows you dont need sudo
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
# cleanup
npm unlink
```

# Troubleshooting

* Make sure the folder exists that the server is trying to read. In Windows, this folder could not be created automatically during testing. The default folder is in the project directory/uploads/
* For NPM issues, update NodeJs and npm
* If you still have package issues, try deleting package-lock.json and reinstalling node modules
* If you still have issues, check to see if a global package is interfering with 

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
    * Developed on Ubuntu, it should work on Linux systems. There were some issues documented when trying to test on Windows.
    * As the reqs are straight forward, I hope it's easy to use
    * More features could be added with user feedback
4. Project tooling
    * As entire project relies only on javascript/typescript, any NodeJS environment should be able to serve this project.

# Notes

* The cli and server share a .ENV file. You can copy the .env.sample file in the /server folder to change the location of where files are stored
* The server will store files to the local machine, but this can be swapped out using the /server/src/services IStorage interface.
* You can run tests with the cli project using `npm run test` which will upload, delete, and list files. Red font will show if there is an error.