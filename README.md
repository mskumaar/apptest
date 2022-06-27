#This has instructions for running Angular scripts (Frontend) and Php scripts (backend)

#Instructions for Angular scripts seutp and run
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.0-rc.0.

## Project Setup details

- Create a new folder and clone the project using below steps
-  You can clone the Project by using git
	-git clone https://gitlab.com/msathishk051/apptest.git
	-change to "main" branch using command as "git checkout main"
  - Once the project is cloned, it has two folders "backend" and "frontend". Go to the "frontend" folder as it has the angular files and then you can execute the command "npm install" for installing dependency packages for the project
  - Run the command "ng serve -o" or "npm start" to execute the project
  - you need to change the backend url(where you're going to run php scripts) in the file   
    "src\app\services\post.service.ts"
  - Navigate to `http://localhost:4200/` in browser


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


## Instructions for running php scripts

##Steps to be followed.

- Install PHP with version 7.2*
- Copy the "backend" folder 
- Place that in "htdocs" folder 
- now you should be able to run the php scripts using "http://localhost:port/backend/"
- Install PHPUnit 9.5.21
- you can find the unit testing scripts in the "unittest" folder =>ApiFunctionsTest.php
-- Go to the "unittest" folder and then run "phpunit ApiFunctionsTest.php" command and that would show the unit testing results.

