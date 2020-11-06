# Instructor Utilities
Live project: https://cr-sm.herokuapp.com/

## Description

This application consists of tools and utilities built to assist teachers instruct boot camp classes.

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)

## Installation

* `npm install` - Install dependencies.
* `npm run envsetup` - Generate a local .env file with the needed configuration.
* `npm start` - Launch local development server.

## Registration Codes

* `node regisitercode MY-CODE-NAME` - Create a new registration code for signup. Code is auto generated if not provided. Provided values will be formatted into UPPERCASE format.

### Demo Seed Data

* `npm run seed` - Seed the application database with demo data
* `npm run seed:reset` - Clear all collections

## Usage

Prominent features include:

* Creating Classrooms
* Inviting TAs
* Adding students
* Assigning students to TAs
* Adding student comments
* Elevating students up the staff heirachy

## Credits

Lead Engineer: Anthony Brown
Students from the UW Coding Boot Camp: Billy Hao, Christopher Marti, Niv Swamy and Trenton Creamer

## License

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)