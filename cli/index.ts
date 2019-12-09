#!/usr/bin/env node

require = require('esm')(module);
require('dotenv').config({
    path: '../server/.env'
});
require('./cli').cli(process.argv)