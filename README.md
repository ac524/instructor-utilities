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

Run `npm install` to install the dependencies.

Run `npm run envsetup` to generate a local .env file with the needed configuration.

### Development Build
Run `npm run watch` to watch both changes to the resources and server application.

### Production Build
Run `npm run build` and then `npm run start`.

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