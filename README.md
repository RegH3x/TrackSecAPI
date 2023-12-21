![logo](https://github.com/RegH3x/TrackSecAPI/assets/38158309/5c16d0ea-992f-41bf-a36c-e60951e5d3d3)

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)


# TrackSecAPI

`TrackSecAPI` is a comprehensive solution for advanced management of Penetration Tests on web and mobile applications. TrackSecAPI is designed for repetitive and long-term projects, providing complete control and visibility over the APIs and endpoints accessed by applications.

# Key Features

* **Advanced API Tracking**: Catalogs intuitively and comprehensively all the APIs of a mobile or web application, providing a detailed overview of all URLs associated with their respective functionalities. Monitors the evolution of APIs through developer updates, maintaining a detailed log of changes, and providing in-depth analysis of potential vulnerabilities introduced.

* **Vulnerability Management**: Identifies and records vulnerabilities for each API, allowing you to monitor critical aspects of your applications' security. Add crucial information such as screenshots, descriptions, and vulnerable parameters for each identified vulnerability, enabling in-depth analysis and a clear understanding of the risk and the application overall.

# License
`TrackSecAPI` is made by two people: [Gianluca Leo](https://github.com/RegH3x/) and [Giorgia D'Armiento](https://github.com/giorgiadarmi) and it is released under the [GPL 3 license](LICENSE)

# Architecture
TrackSecAPI is a web application made by three components:
* Backend: **Express Node.js**
* Frontend: **Angular**
* DB: **MySQL**


# Dependencies

In order to run TrackSecAPI you need to install first nodejs, ng (Angular CLI), mysql-server and python3

## WINDOWS

- [Download and install Node.js LTS version](https://nodejs.org/)
- [Download and install MySQL Server](dev.mysql.com)
- [Download Python3 for Windows](https://www.python.org/downloads/)
    
**Install Angular CLI (ng)**

Open a Command Prompt or PowerShell window and run the following command:

```bash
npm install -g @angular/cli
```


## LINUX

```bash
sudo apt update
sudo apt install nodejs
sudo apt install npm
sudo apt install mysql-server
sudo apt install python3
```

## MACOS

```bash
brew install node
npm install -g @angular/cli
brew install mysql
brew install python3
```


# INSTALLATION


```bash
git clone https://github.com/RegH3x/TrackSecAPI.git
cd TrackSecAPI
```
### MySQL Configuration

```
cp DBcreation_template.py DBcreation.py
```

Create a user in mysql and put username and password in [DBcreation.py](DBcreation.py) file.

Run the DB creation script
```bash
pip3 install mysql-connector-python --user
python3 DBcreation.py
```

Set DB credentials in the express backend 

```
cd myExpressApp
cp configdb_template.js configdb.js
nano configdb.js
```

### Backend: Express NodeJS Configuration

```
cd myExpressApp/
npm install
```

### Frontend: Angular and Bootstrap Configuration

```
sudo npm install -g @angular/cli
cd frontend
npm install bootstrap bootstrap-icons @popperjs/core @ng-bootstrap/ng-bootstrap
ng add @ng-bootstrap/ng-bootstrap
```

Modify angular.json in order to get bootstrap5 working

```
nano frontend/angular.json
```
Add those lines
```
    "scripts": [
                "/node_modules/@popperjs/core/dist/umd/popper.min.js",
                "/node_modules/bootstrap/dist/js/bootstrap.min.js"
                ]
```

# Usage

### Connect to the backend express server
```
cd myExpressApp/
npm start
```
The backend will now be listening on http://localhost:3000

### Start angular + bootstrap frontend
```
cd frontend
ng serve
```

### Connect to the web app
```
http://localhost:4200
```


# Todo
- [ ] [SECURITY] clear the codebase from files not necessary
- [ ] [SECURITY] update .gitignore
- [ ] [SECURITY] Secure Code Review + update code
- [ ] [SECURITY] Disable development mode in Angular
- [ ] [SECURITY] Remove all 'console.log()'
