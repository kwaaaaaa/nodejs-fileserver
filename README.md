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
# install server
cd server
npm install
# test installation
npm run test
# start server
npm start
# if this doesnt work (like on windows), run the app without nodemon
npm run start2

# install cli and run cli commands on new terminal
cd cli
npm install
# link cli (note on windows you dont need sudo)
sudo npm link
# test cli commands
fs-store --help
fs-store --upload --path README.md
fs-store --list
fs-store --delete --name README.md
# start web ui
cd ../client
npm install
npm start
# test web ui in browser
sensible-browser http://localhost:3000
# cleanup
npm unlink
# after this you can `npm run test` in each terminal window to run unit and integration tests
# exit out of terminal windows
```

# Troubleshooting

* Make sure the folder exists that the server is trying to read. In Windows, this folder could not be created automatically during testing. The default folder is in the project directory/uploads/
* For NPM issues, update NodeJs and npm
* If you still have package issues, try deleting package-lock.json and reinstalling node modules
* If you still have issues, check to see if a global package is interfering with 

# Questions

1. Correctness of code
    * Typescript is used to enable static typing which made refactoring easier and will scale the app better if it were to grow
    * See Jest Testing section
2. Error Handling / Bad inputs
    * Error handling provided through the server with the ErrorMessage class
    * Error handling provided when the file already exists
    * The server will reject large files without an error message, so this is handled via the client. I set a 50mb limit which is found in server/index.ts
3. Ease of Use
    * Developed on Ubuntu, it should work on Linux systems. There were some issues documented when trying to test on Windows.
    * The environments for frontend/backend/cli are using similar enviroments which should make deployment easier
    * Troubleshooting server issues can be resolved by referring to server/logs/
    * More features could be added with user feedback
4. Project tooling
    * As entire project relies only on javascript/typescript, any NodeJS environment should be able to serve this project.

# Jest/Testing Library Testing

### notable test files

1. client/src/components/FileUploadPage.test.tsx
2. cli/cli.test.js
3. server/src/services/FileStorage.test.ts

### client

* Integration tests for client using React Testing Library
    1. Ensures api is called just once on page load and loading message renders properly before and after api data is rendered (this implicitly also tests server connectivity)
    2. Ensures user is prompted to confirm deletion when clicking delete file
# Api server needs to be running, you can change the server ip address with .ENV
```bash
cd server
npm run start
cd ../cli
npm run test
```

### cli

* Intgegration tests for CLI using child processes to call the command line
    1. Test upload, list, and delete for local file server
    2. Test upload, list, and delete for api file server (needs to be running)
```bash
# Api server needs to be running, you can change the server ip address with .ENV
cd server
npm run start
cd ../cli
npm run test
```

### server

* Unit tests for server
* Since the cli tests the actual api calls, this test suite will focus more on unit testing
* Test coverage skips testing file uploads and actual file deletions but can still  cover 67% of code
* I could have covered file uploads and deletions with a service like supertest to make actual api calls, but the CLI already does this so I felt it was redundant to keep separate tests that do the same thing.
```bash
npm run test
```

# Notes

* The cli and server share a .ENV file. You can copy the .env.sample file in the /server folder to change the location of where files are stored
* The server will store files to the local machine, but this can be swapped out using the /server/src/services IStorage interface.
* You can run tests with the cli project using `npm run test` which will upload, delete, and list files. Red font will show if there is an error.