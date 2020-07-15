# Instructor Utilities
Live project: https://instructor-utilities.herokuapp.com/

## Description

This application consists of tools and utilities built to assist teachers instruct boot camp classes.

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)
* [Tests](#tests)
* [Questions](#questions)

## Installation

* `npm install` - Install dependencies.
* `npm run envsetup` - Generate a local .env file with the needed configuration.
* `sequelize db:create` - Create the application database.

### Development Build

* `npm run watch` - Watch changes to both public resource and server application dependencies.
* `npm run watch:build` - Watch public resource dependencies.
* `npm run watch:server` - Watch server application dependencies.

### Production Build

* `npm run production` - Build production resources and launch server.

### Demo Seed Data

* `sequelize db:seed:all` - Seed the application database with demo data
* `sequelize db:seed:undo:all` - Remove all application data

## Usage

The application's primary function is to house lists of students that an instructor can randomly select from. 

Prominent features include:

* Adding new lists and list items
* Randomly cycle through list items using the "Next" and "Prev" buttons
* Temporarily disable certain list items using the "Disable Current" button or clicking the eye icon next to a list item (useful when a student is absent)
* Exporting and importing lists

## Credits

Lead Engineer: Anthony Brown
Students from the UW Coding Boot Camp: Billy Hao, Christopher Marti, Niv Swamy and Trenton Creamer

## License

[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Tests

Run "npm run test" to run the tests present in the test directory.

## Questions

![GitHub Profile Picture](https://github.com/ac524.png)

Email Anthony at <ac524.brown@gmail.com>