#database in /var/lib/mysql

import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="USER",
  password="PASSWORD"
)

database="TrackSecAPI"


mycursor = mydb.cursor()

mycursor.execute(f"CREATE DATABASE IF NOT EXISTS {database}")

mycursor.execute(f"USE {database}")

mycursor.execute("""CREATE TABLE Projects (
id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
projectName VARCHAR(255) NOT NULL,
creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP)""")

mycursor.execute("""CREATE TABLE Endpoints (
id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
pathUi VARCHAR(255) NULL,
domain VARCHAR(255) NOT NULL,
Endpoint VARCHAR(255) NOT NULL,
ApiDescription TEXT NULL,
creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
projectId INTEGER NOT NULL,
testCheck BOOLEAN DEFAULT 0,
environment BOOLEAN DEFAULT 0,
FOREIGN KEY (projectId) REFERENCES Projects(id))""")

mycursor.execute("""CREATE TABLE Parameters (
id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
parameterName VARCHAR(255) NOT NULL,
note TEXT NULL,
creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
endpointId INTEGER NOT NULL,
FOREIGN KEY (endpointId) REFERENCES Endpoints(id))""")

mycursor.execute("""CREATE TABLE Vulnerabilities (
id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
vulName VARCHAR(255) NOT NULL,
screenshot VARCHAR(255) NULL,
note TEXT NULL,
consequence TEXT NOT NULL,
requestPayload TEXT NOT NULL,
responseServer TEXT NOT NULL,
vulState BOOLEAN NOT NULL,
creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
closingDate TIMESTAMP NULL,
endpointId INTEGER NOT NULL,
FOREIGN KEY (endpointId) REFERENCES Endpoints(id))""")

mycursor.execute("""CREATE TABLE VulnParameters (
id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
vulnerabilityId INTEGER NOT NULL,
parameterId INTEGER NOT NULL,
FOREIGN KEY (vulnerabilityId) REFERENCES Vulnerabilities(id),
FOREIGN KEY (parameterId) REFERENCES Parameters(id))""")

mycursor.execute("""CREATE TABLE EndpointsParameters (
id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
endpointId INTEGER NOT NULL,
parameterId INTEGER NOT NULL,
FOREIGN KEY (endpointId) REFERENCES Endpoints(id),
FOREIGN KEY (parameterId) REFERENCES Parameters(id))""")

mycursor.execute("""CREATE TABLE EndpointsCorrelations (
id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
LinkedEndpointId INTEGER NOT NULL,
NewEndpointId INTEGER NOT NULL,
FOREIGN KEY (LinkedEndpointId) REFERENCES Endpoints(id),
FOREIGN KEY (NewEndpointId) REFERENCES Endpoints(id))""")

mydb.commit()
mydb.close()