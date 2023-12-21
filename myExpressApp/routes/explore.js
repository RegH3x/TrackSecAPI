var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const config = require("../configdb");
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: true })

router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});


router.get('/projects', function(req, res) {
	var projectList = [];
	var connection = config.getMySQLConnection();
	connection.connect();
	connection.query('SELECT * FROM Projects', function(err, rows, fields) {
	  	if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": "internal server error"});
	  	} else {
	  		for (var i = 0; i < rows.length; i++) {
		  		var project = {
		  			'id':rows[i].id,
	          	    'projectName':rows[i].projectName,
	          		'creationDate':rows[i].creationDate
		  		}		  		
		  		projectList.push(project);
	  	}  	
		res.send(projectList);
	  	}
	});
	connection.end();	
});

router.post('/searchInAllProjects', function(req, res) {
	var connection = config.getMySQLConnection();
	connection.connect();
	if (req.body.searchType == "Endpoints"){
		var endpointList = [];
		connection.query(`SELECT Endpoints.id, Endpoints.Endpoint, Endpoints.projectId FROM Endpoints JOIN Projects ON Endpoints.projectId = Projects.id WHERE (Endpoint LIKE '%${req.body.valueSearch}%') AND (projectId IN (${req.body.listOfProject}))`, function(err, rows, fields) {
			if (err) {
				res.status(500).json({"status_code": 500,"status_message": "internal server error"});
			} else {
				for (var i = 0; i < rows.length; i++) {
					var endpoint = {
						'id':rows[i].id,
						'Endpoint':rows[i].Endpoint,
						'projectId':rows[i].projectId,
						'projectName':rows[i].projectName
					}
					endpointList.push(endpoint);
			}
			res.send(endpointList);
			}
	  });
	}
	if (req.body.searchType == "Parameters"){
		var parameterList = [];
		connection.query(`SELECT Parameters.id, Parameters.parameterName, Parameters.endpointId, Endpoints.projectId, Projects.projectName FROM Endpoints JOIN Parameters ON Parameters.endpointId = Endpoints.id JOIN Projects ON Endpoints.projectId = Projects.id WHERE (Parameters.parameterName LIKE '%${req.body.valueSearch}%') AND (Endpoints.projectId IN (${req.body.listOfProject})) GROUP BY Parameters.id`, function(err, rows, fields) {
			if (err) {
				res.status(500).json({"status_code": 500,"status_message": "internal server error"});
			} else {
				for (var i = 0; i < rows.length; i++) {
					var parameter = {
						'id':rows[i].id,
						'parameterName':rows[i].parameterName,
						'endpointId':rows[i].endpointId,
						'projectId':rows[i].projectId,
						'projectName':rows[i].projectName
					}
					parameterList.push(parameter);
			}
			res.send(parameterList);
			}
	  });
	}
	if (req.body.searchType == "Vulnerabilities"){
		var vulnerabilityList = [];
		connection.query(`SELECT Vulnerabilities.id, Vulnerabilities.vulName, Vulnerabilities.endpointId, Endpoints.projectId, Projects.projectName FROM Endpoints JOIN Vulnerabilities ON Vulnerabilities.endpointId = Endpoints.id JOIN Projects ON Endpoints.projectId = Projects.id WHERE (Vulnerabilities.vulName LIKE '%${req.body.valueSearch}%') AND (Endpoints.projectId IN (${req.body.listOfProject})) GROUP BY Vulnerabilities.id`, function(err, rows, fields) {
			if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": "internal server error"});
	  	} else {
	  		for (var i = 0; i < rows.length; i++) {
		  		var vulnerability = {
		  			'id':rows[i].id,
	          	    'vulName':rows[i].vulName,
					'endpointId':rows[i].endpointId,
					'projectId':rows[i].projectId,
					'projectName':rows[i].projectName
		  		}
		  		vulnerabilityList.push(vulnerability);
	  	}
	  	res.send(vulnerabilityList);
	  	}
	});
	}
	connection.end();
});

router.get('/endpoints', function(req, res) {
	var endpointList = [];
	var connection = config.getMySQLConnection();
	connection.connect();
	connection.query('SELECT * FROM Endpoints', function(err, rows, fields) {
	  	if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": "internal server error"});
	  	} else {
	  		
	  		for (var i = 0; i < rows.length; i++) {
	  			
		  		var endpoint = {
		  			'id':rows[i].id,
	          	    'pathUi':rows[i].pathUi,
	          	    'domain':rows[i].domain,
                    'Endpoint':rows[i].Endpoint,
                    'ApiDescription':rows[i].ApiDescription,
                    'creationDate':rows[i].creationDate,
                    'projectId':rows[i].projectId
		  		}
		  		
		  		endpointList.push(endpoint);
	  	}
	  	
	  	res.render('endpoints', {"endpointList": endpointList});
	  	}
	});
	
	connection.end();	
});

router.get('/parameters', function(req, res) {
	var parameterList = [];
	
	var connection = config.getMySQLConnection();
	connection.connect();
	
	connection.query('SELECT * FROM Parameters', function(err, rows, fields) {
	  	if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": "internal server error"});
	  	} else {
	  		
	  		for (var i = 0; i < rows.length; i++) {
	  			
		  		var parameter = {
		  			'id':rows[i].id,
	          	    'parameterName':rows[i].parameterName,
	          	    'note':rows[i].note,
                    'creationDate':rows[i].creationDate,
                    'endpointId':rows[i].endpointId
		  		}
		  		
		  		parameterList.push(parameter);
	  	}
	  	
	  	res.render('parameters', {"parameterList": parameterList});
	  	}
	});
	
	connection.end();	
});

router.get('/vulnerabilities', function(req, res) {
	var vulnerabilityList = [];
	
	var connection = config.getMySQLConnection();
	connection.connect();
	
	connection.query('SELECT * FROM Vulnerabilities', function(err, rows, fields) {
	  	if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": "internal server error"});
	  	} else {
	  		
	  		for (var i = 0; i < rows.length; i++) {
	  			
		  		var vulnerability = {
		  			'id':rows[i].id,
	          	    'vulName':rows[i].vulName,
	          	    'screenshot':rows[i].screenshot,
                    'note':rows[i].note,
                    'consequence':rows[i].consequence,
                    'requestPayload':rows[i].requestPayload,
                    'responseServer':rows[i].responseServer,
					'vulState':rows[i].vulState,
					'viewParameters':rows[i].viewParameters,
					'creationDate':rows[i].creationDate,
					'closingDate':rows[i].closingDate,
					'endpointId':rows[i].endpointId
		  		}
		  		
		  		vulnerabilityList.push(vulnerability);
	  	}
	  	
	  	res.render('vulnerabilities', {"vulnerabilityList": vulnerabilityList});
	  	}
	});
	
	connection.end();	
});



module.exports = router;
