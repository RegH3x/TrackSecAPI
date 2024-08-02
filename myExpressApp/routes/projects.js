var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const config = require("../configdb");
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: true })


router.post('/', function (req, res, next) {
	var connection = config.getMySQLConnection();
	connection.connect();
	connection.query(`INSERT INTO Projects (projectName) VALUES ('${req.body.projectName}')`, function(err, rows, fields) {
	  	if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": err.message});
	  	} else {
			res.send(`Your project name is ${req.body.projectName}!`);
	  	}
	});	
	connection.end();	
});

router.get('/', function (req, res, next) {
	res.render('addprojects');
});

router.get('/:id', function(req, res, next) {
	var projectList = [];
	var connection = config.getMySQLConnection();
	connection.connect();
	connection.query(`SELECT * FROM Projects WHERE id=${req.params.id}`, function(err, rows, fields) {
		var project;
	  	if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": err.message});
	  	} else {
	  		
	  		if(rows.length==1) {	  			
		  		var project = {
					'id':rows[0].id,
					'projectName':rows[0].projectName,
					'creationDate':rows[0].creationDate
				}
				projectList.push(project);
		  		
				res.send(projectList);
	  		} else {	  			
	  			res.status(404).json({"status_code":404, "status_message": "Not found"});
	  		}
	  	}
	});	
	connection.end();
});

router.put('/:id', function (req, res) {
	var connection = config.getMySQLConnection();
	connection.connect();
	connection.query(`UPDATE Projects SET projectName='${req.body.projectName}' WHERE id=${req.params.id}`, function(err) {
	  	if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": err.message});
	  	} else {
			res.send(`Project updated successfully`);
	  	}
	});
	connection.end();	
});

router.delete('/:id', function (req, res) {
	var connection = config.getMySQLConnection();
	connection.connect();
	connection.query(`DELETE FROM Projects WHERE id=${req.params.id}`, function(err) {
	  	if (err) {
	  		
			res.send(`Impossibile rimuovere progetto con dipendenze!`);
	  	} else {
			res.send(`Delete project!`);
	  	}
	});
	
	connection.end();	
});


router.post('/:id/allparametersforproject', function(req, res) {
	var paramlist = [];
	var connection = config.getMySQLConnection();
	connection.connect();
	connection.query(`SELECT Parameters.id, Parameters.parameterName, Parameters.endpointId FROM Parameters JOIN Endpoints ON Endpoints.id=Parameters.endpointId WHERE Endpoints.projectId=${req.params.id} AND Parameters.parameterName LIKE '%${req.body.parameterName}%'`, function(err, rows, fields) {
		if (err) {
			res.status(500).json({"status_code2": 500,"status_message": err.message});
		} else {
			for (var i = 0; i < rows.length; i++) {
				var param = {
					'id':rows[i].id,
					'parameterName':rows[i].parameterName,
					'endpointId':rows[i].endpointId
				}
				paramlist.push(param);
			}
		}
		res.send(paramlist);
	});
	connection.end();
});


router.post('/:id/allvulnerabilitiesforproject', function(req, res) {
	var vulnlist = [];
	var connection = config.getMySQLConnection();
	connection.connect();
	connection.query(`SELECT Vulnerabilities.id, Vulnerabilities.vulName, Vulnerabilities.endpointId FROM Vulnerabilities JOIN Endpoints ON Endpoints.id=Vulnerabilities.endpointId WHERE Endpoints.projectId=${req.params.id} AND Vulnerabilities.vulName LIKE '%${req.body.vulName}%'`, function(err, rows, fields) {
		if (err) {
			res.status(500).json({"status_code2": 500,"status_message": err.message});
		} else {
			for (var i = 0; i < rows.length; i++) {
				var vul = {
					'id':rows[i].id,
					'vulName':rows[i].vulName,
					'endpointId':rows[i].endpointId
				}
				vulnlist.push(vul);
			}
		}
		return res.send(vulnlist);
	});
	connection.end();
});


router.post('/:id/searchvulPara', function(req, res, next) {
	var vulparList = [];
	var connection = config.getMySQLConnection();
	connection.connect();
	connection.query(`SELECT Vulnerabilities.vulName, Vulnerabilities.id, Vulnerabilities.endpointId FROM Vulnerabilities JOIN Parameters ON Vulnerabilities.endpointId=Parameters.endpointId AND vulState=True AND Parameters.parameterName LIKE '%${req.body.parameterName}%' GROUP BY Vulnerabilities.vulName`, function(err, rows, fields, next) {
		vulparList = [];
		if (err) {
			res.status(500).json({"status_code": 500,"status_message": err.message});
		} else {
			for (var i = 0; i < rows.length; i++) {
				var vulpar = {
					'id':rows[i].id,
					'vulName':rows[i].vulName,
					'endpointId':rows[i].endpointId
				}
				vulparList.push(vulpar);
			}
			res.send(vulparList);
		}
	});
});


router.get('/:id/:idendpoint/viewtabvulparameter', function(req,res){
	var vulnparameterList = [];
	var connection = config.getMySQLConnection();
	connection.connect();
	connection.query(`SELECT VulnParameters.id, Vulnerabilities.vulName, VulnParameters.vulnerabilityId, Parameters.parameterName, VulnParameters.parameterId FROM Vulnerabilities JOIN VulnParameters ON VulnParameters.vulnerabilityId = Vulnerabilities.id JOIN Parameters ON Parameters.id = VulnParameters.parameterId WHERE Vulnerabilities.endpointId=${req.params.idendpoint} AND Parameters.endpointId=${req.params.idendpoint};`, function(err, rows4, fields) {
		if (err) {
			res.status(500).json({"status_code": 500,"status_message": err.message});
		} else {
			for (var i = 0; i < rows4.length; i++) {
				var vulnparameter = {
					'id':rows4[i].id,
					'vulnerabilityId':rows4[i].vulnerabilityId,
					'parameterId':rows4[i].parameterId,
					'vulName':rows4[i].vulName,
					'parameterName':rows4[i].parameterName
				}
				vulnparameterList.push(vulnparameter);
			}
			res.send(vulnparameterList);
		}
	});	
	connection.end();													
});


router.get('/:id/viewtabendparameter', function(req,res){
	var endparameterList = [];
	var connection = config.getMySQLConnection();
	connection.connect();
	connection.query(`SELECT EndpointsParameters.id, Parameters.parameterName, EndpointsParameters.parameterId, Endpoints.Endpoint, EndpointsParameters.endpointId FROM Endpoints JOIN EndpointsParameters ON Endpoints.id = EndpointsParameters.endpointId JOIN Parameters ON Parameters.id = EndpointsParameters.parameterId WHERE Endpoints.projectId=${req.params.id};`, function(err, rows4, fields) {
		if (err) {
			res.status(500).json({"status_code": 500,"status_message": err.message});
		} else {
			for (var i = 0; i < rows4.length; i++) {
				var endparameter = {
					'id':rows4[i].id,
					'endpointId':rows4[i].endpointId,
    				'parameterId':rows4[i].parameterId,
					'endpointName':rows4[i].Endpoint,
					'parameterName':rows4[i].parameterName
				}
				endparameterList.push(endparameter);
			}
			res.send(endparameterList);
		}
	});	
	connection.end();													
});


router.post('/:id/addendpoint', function (req, res, next) {
	var error = '';
	var correlation = '';
	var connection = config.getMySQLConnection();
	connection.connect();
	connection.query(`INSERT INTO Endpoints (pathUi, domain, Endpoint, ApiDescription, projectId, environment) VALUES ('${req.body.pathUI}', '${req.body.domain}', '${req.body.endpoint}', '${req.body.apiDescription}', '${req.body.environment}', '${req.params.id}')`, function(err, rows, fields) {
		if (err) {
		errinternal = 'err';
		res.status(500).json({"status_code": 500,"status_message": '1:'+err.message});
	} else {
		correlation = rows.insertId;
		if (req.body.linkedEndpointID != null){
			connection.query(`INSERT INTO EndpointsCorrelations (LinkedEndpointId, NewEndpointId) VALUES ('${req.body.linkedEndpointID}', '${correlation}')`, function(err, rows2, fields) {
				if (err) {
					errinternal = 'err';
					res.status(500).json({"status_code": 500,"status_message": '2:'+err.message});
				}
			});
		}
		connection.end();
		if(error){
			res.status(500).json({ "status_code1": 500, "status_message": '3:'+error });
		}
		else{
			res.send(`Endpoint created`);
		}						
	}
	});
});

router.get('/:id/allendpoints', function(req, res, next) {
	var endpointList = [];
	var connection = config.getMySQLConnection();
	connection.connect();
	connection.query(`SELECT Endpoints.id, Endpoints.pathUi, Endpoints.domain, Endpoints.Endpoint, Endpoints.apiDescription, Endpoints.creationDate, Endpoints.projectId, Endpoints.environment, Endpoints.testCheck, COUNT(Parameters.id) AS countParameters FROM Endpoints LEFT JOIN Parameters ON Endpoints.id = Parameters.endpointId WHERE Endpoints.projectId=${req.params.id} GROUP BY Endpoints.id ORDER BY domain ASC`, function(err, rows, fields) {
		if (err) {
			res.status(500).json({"status_code": 500,"status_message": err.message});
		} else {			
			for (var i = 0; i < rows.length; i++) {		
				var endpoint = {
					'id':rows[i].id,
					'pathUI':rows[i].pathUi,
					'domain':rows[i].domain,
					'endpoint':rows[i].Endpoint,
					'apiDescription':rows[i].ApiDescription,
				  	'creationDate':rows[i].creationDate,
				  	'projectId':rows[i].projectId,
					'environment':rows[i].environment,
					'testCheck':rows[i].testCheck,
					'countParameters':rows[i].countParameters
				}				
				endpointList.push(endpoint);		
			}
		res.send(endpointList);
		}
	});	
	connection.end();
});

router.get('/:id/alldomains', function(req, res, next) {
	var domainList = [];
	var connection = config.getMySQLConnection();
	connection.connect();
	connection.query(`SELECT domain FROM Endpoints WHERE projectId=${req.params.id} GROUP BY domain`, function(err, rows, fields) {
		if (err) {
			res.status(500).json({"status_code": 500,"status_message": err.message});
		} else {			
			for (var i = 0; i < rows.length; i++) {			
				var domain = {
					'domain':rows[i].domain,
				}
				domainList.push(domain);
			}
		res.send(domainList);
		}
	});
	connection.end();	
});

router.post('/:id/allendpointsByDomain', function(req, res, next) {
	var endpointList = [];
	var connection = config.getMySQLConnection();
	connection.connect();
	connection.query(`SELECT Endpoints.id, Endpoints.pathUi, Endpoints.domain, Endpoints.Endpoint, Endpoints.environment, Endpoints.testCheck, COUNT(Parameters.id) AS countParameters FROM Endpoints LEFT JOIN Parameters ON Endpoints.id = Parameters.endpointId WHERE projectId=${req.params.id} AND domain="${req.body.selectedDomain}" GROUP BY Endpoints.id;`, function(err, rows2, fields) {
		if (err) {
			res.status(500).json({"status_code": 500,"status_message": err.message});
		} else {			
			for (var i = 0; i < rows2.length; i++) {			
				var endpoint = {
					'id':rows2[i].id,
					'pathUI':rows2[i].pathUi,
					'domain':rows2[i].domain,
					'endpoint':rows2[i].Endpoint,
					'environment':rows2[i].environment,
					'testCheck':rows2[i].testCheck,
					'countParameters':rows2[i].countParameters
				}
				endpointList.push(endpoint);
			}
		res.send(endpointList);
		}
	});
	connection.end();	
});

router.post('/:id/filterByCheck', function(req, res, next) {
	var endpointList = [];
	var connection = config.getMySQLConnection();
	connection.connect();
	connection.query(`SELECT Endpoints.id, Endpoints.pathUi, Endpoints.domain, Endpoints.Endpoint, Endpoints.environment, Endpoints.testCheck, COUNT(Parameters.id) AS countParameters FROM Endpoints LEFT JOIN Parameters ON Endpoints.id = Parameters.endpointId WHERE projectId=${req.params.id} AND testCheck="${req.body.selectedTestCheck}" GROUP BY Endpoints.id;`, function(err, rows2, fields) {
		if (err) {
			res.status(500).json({"status_code": 500,"status_message": err.message});
		} else {			
			for (var i = 0; i < rows2.length; i++) {			
				var endpoint = {
					'id':rows2[i].id,
					'pathUI':rows2[i].pathUi,
					'domain':rows2[i].domain,
					'endpoint':rows2[i].Endpoint,
					'environment':rows2[i].environment,
					'testCheck':rows2[i].testCheck,
					'countParameters':rows2[i].countParameters
				}
				endpointList.push(endpoint);
			}
		res.send(endpointList);
		}
	});
	connection.end();	
});

router.put('/:id/:idendpoint/updateTestCheck', function (req, res) {
	var connection = config.getMySQLConnection();
	connection.connect();
	connection.query(`UPDATE Endpoints SET testCheck=True WHERE id=${req.params.idendpoint}`, function(err, rows) {
		if (err) {
			res.status(500).json({"status_code": 500,"status_message": err.message});
		} else {
			res.send(`Check test state updated successfully`);
		}
  	});
	connection.end();
});


router.put('/:id/refreshTestCheck', function (req, res) {
	var connection = config.getMySQLConnection();
	connection.connect();
	connection.query(`UPDATE Endpoints SET testCheck=False WHERE projectId=${req.params.id}`, function(err, rows) {
		if (err) {
			res.status(500).json({"status_code": 500,"status_message": err.message});
		} else {
			res.send(`Check test state refresh successfully`);
		}
  	});
	connection.end();
});

router.post('/:id/allendpoints/searchEndpoint', function(req, res) {
	var connection = config.getMySQLConnection();
	connection.connect();
	var endpointList = [];
	connection.query(`SELECT id, Endpoint, projectId FROM Endpoints WHERE (Endpoint LIKE '%${req.body.valueSearch}%') AND (projectId=${req.params.id})`, function(err, rows, fields) {
		if (err) {
			res.status(500).json({"status_code": 500,"status_message": "internal server error"});
		} else {
			for (var i = 0; i < rows.length; i++) {
				var endpoint = {
					'id':rows[i].id,
					'Endpoint':rows[i].Endpoint,
					'projectId':rows[i].projectId
				}
				endpointList.push(endpoint);
		}
		res.send(endpointList);
		}
	});
	connection.end();
});


router.get('/:id/:idendpoint', function(req, res, next) {
	endpointList = [];
	var connection = config.getMySQLConnection();
	connection.connect();
	connection.query(`SELECT * FROM Endpoints WHERE id=${req.params.idendpoint} AND projectId=${req.params.id}`, function(err, rows, fields) {
		var endpoint;
	  	if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": err.message});
	  	} else {
	  		
	  		if(rows.length==1) {
	  			
		  		var endpoint = {
					'id':rows[0].id,
					'pathUI':rows[0].pathUi,
					'domain':rows[0].domain,
					'endpoint':rows[0].Endpoint,
					'apiDescription':rows[0].ApiDescription,
					'creationDate':rows[0].creationDate,
					'projectId':rows[0].projectId,
					'environment':rows[0].environment,
					'testCheck':rows[0].testCheck
				}
				endpointList.push(endpoint);
				res.send(endpointList);
			} else {
				
				res.status(404).json({"status_code":404, "status_message": "Not found"});
			}
	  	}
	});
	
	connection.end();
});

router.put('/:id/:idendpoint', function (req, res) {
	var error = '';
	var connection = config.getMySQLConnection();
	connection.connect();
	connection.query(`UPDATE Endpoints SET pathUi='${req.body.pathUI}', domain='${req.body.domain}', Endpoint='${req.body.endpoint}', ApiDescription='${req.body.apiDescription}', environment='${req.body.environment}', projectId=${req.params.id} WHERE id=${req.params.idendpoint}`, function(err, rows) {
		if (err) {
			error += err.message;
		} else {
			connection.query(`SELECT COUNT(NewEndpointId) FROM EndpointsCorrelations WHERE NewEndpointId=${req.params.idendpoint}`, function(err, rows2, fields) {
				if (err) {
					error += err.message;
				} else {
					const rowData = rows2[0];
					const countValue = rowData['COUNT(NewEndpointId)'];
					if(countValue==0){
						connection.query(`INSERT INTO EndpointsCorrelations (LinkedEndpointId, NewEndpointId) VALUES ('${req.body.linkedEndpointID}', '${req.params.idendpoint}')`, function(err, rows3, fields) {
							if (err) {
								error += err.message;
							}
						});						
					} else {
						connection.query(`UPDATE EndpointsCorrelations SET LinkedEndpointId='${req.body.linkedEndpointID}', NewEndpointId=${req.params.idendpoint} WHERE NewEndpointId=${req.params.idendpoint}`, function(err, rows4, fields) {
							if (err) {
								error += err.message;
							}
						});
					}
					if(error)
						res.status(500).json({ "status_code1": 500, "status_message": error });
					else
						res.send(`Endpoint updated successfully!`);
					connection.end();
				}			
			});							
		}
  });
});

router.delete('/:id/:idendpoint', function (req, res) {
	var error = '';
	var connection = config.getMySQLConnection();
	connection.connect();
	connection.query(`DELETE FROM EndpointsParameters WHERE endpointId=${req.params.idendpoint}`, function(err) {
		if (err) {
			error += err.message;
		} else {
			connection.query(`DELETE FROM EndpointsCorrelations WHERE (LinkedEndpointId=${req.params.idendpoint}) OR (NewEndpointId=${req.params.idendpoint})`, function(err) {
				if (err) {
					error += err.message;
				} else{
					connection.query(`DELETE FROM Endpoints WHERE id=${req.params.idendpoint}`, function (err, rows2, fields) {
						if(error)
							res.status(500).json({ "status_code1": 500, "status_message": error });
						else
							res.send(`Delete endpoint!`);
					});
					connection.end();				
				}
			});	
		}
	});	
});


router.get('/:id/:idendpoint/showendpointcorr', function(req, res, next) {
	var endcorrList = [];
	var connection = config.getMySQLConnection();
	connection.connect();
	connection.query(`SELECT Endpoints.Endpoint, Endpoints.id FROM Endpoints JOIN EndpointsCorrelations WHERE (Endpoints.id = EndpointsCorrelations.LinkedEndpointId AND EndpointsCorrelations.NewEndpointId=${req.params.idendpoint}) OR (Endpoints.id = EndpointsCorrelations.NewEndpointId AND EndpointsCorrelations.NewEndpointId=${req.params.idendpoint})`, function(err, rows, fields) {
		if (err) {
			res.status(500).json({"status_code": 500,"status_message": err.message});
		} else {
			if(rows.length>=1) {
				var endcorr = {
					'LinkedEndpointId':rows[0].id,
					'LinkedEndpoint':rows[0].Endpoint,
					'NewEndpointId':rows[1].id,
					'NewEndpoint':rows[1].Endpoint
				}
				endcorrList.push(endcorr);
				res.send(endcorrList);
		  } else {
			  res.status(404).json({"status_code":404, "status_message": "Not found"});
		  }			
		}
	});
	connection.end();
});


router.post('/:id/:idendpoint/addparameter', function (req, res, next) {
	var connection = config.getMySQLConnection();
	var error = '';
	connection.connect();	
	connection.query(`INSERT INTO Parameters (parameterName, note, endpointId) VALUES ('${req.body.parameterName}', '${req.body.note}', '${req.params.idendpoint}')`, function(err, rows, fields) {
	  	if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": err.message});
	  	} else {		
			connection.query(`SELECT Endpoints.id FROM Parameters JOIN Endpoints ON Endpoints.id=Parameters.endpointId WHERE Parameters.parameterName='${req.body.parameterName}'`, function (err, rows4, fields) {
				if (err) {
					res.status(500).json({ "status_code4": 500, "status_message": err.message });
				} else {
					for (var i = 0; i < rows4.length; i++) {
						
						connection.query(`INSERT INTO EndpointsParameters (endpointId, parameterId) VALUES (${rows4[i].id},${rows.insertId})`, function (err, rows5, fields) {
							if (err) {
								error += err.message;
							}
						});						
					}
					if(error)
						res.status(500).json({ "status_code1": 500, "status_message": error });
					else
					res.send(`Parameter created with id: ${rows.insertId}`);						

				}	
			});
			
		}
	});	
});

router.get('/:id/:idendpoint/allparameters', function(req, res, next) {
	var parameterList = [];
	var connection = config.getMySQLConnection();
	connection.connect();
	connection.query(`SELECT * FROM Parameters WHERE endpointId=${req.params.idendpoint}`, function(err, rows, fields) {
			if (err) {
				res.status(500).json({"status_code": 500,"status_message": err.message});
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
			res.send(parameterList);
			}
	});
	
	connection.end();	
});

router.get('/:id/:idendpoint/par/:idparameter', function (req, res, next) {
	var parameterList = [];
	var connection = config.getMySQLConnection();
	connection.connect();
	
	connection.query(`SELECT * FROM Parameters WHERE id=${req.params.idparameter} AND endpointId=${req.params.idendpoint}`, function(err, rows, fields) {
	  	if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": err.message});
	  	} else {
	  		
	  		if(rows.length==1) {
	  			
		  		var parameter = {
		  			'id':rows[0].id,
			  		'parameterName':rows[0].parameterName,
			  		'note':rows[0].note,
					'creationDate':rows[0].creationDate,
					'endpointId':rows[0].endpointId
		  		}
		  		parameterList.push(parameter);
	  	}
	  	res.send(parameterList);
	  	}
	});
	
	connection.end();	
});

router.put('/:id/:idendpoint/par/:idparameter', function (req, res) {
	var connection = config.getMySQLConnection();
	connection.connect();
	connection.query(`UPDATE Parameters SET parameterName='${req.body.parameterName}', note='${req.body.note}', endpointId='${req.params.idendpoint}' WHERE id=${req.params.idparameter}`, function(err) {
	  	if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": err.message});
	  	} else {
			res.send(`Parameter updated successfully!`);
	  	}
	});
	
	connection.end();	
});

router.delete('/:id/:idendpoint/par/:idparameter', function (req, res) {
	var error = '';
	var connection = config.getMySQLConnection();
	connection.connect();
	connection.query(`DELETE FROM VulnParameters WHERE parameterId=${req.params.idparameter}`, function(err) {
		if (err) {
			error += err.message;
		} else {
			connection.query(`DELETE FROM EndpointsParameters WHERE parameterId=${req.params.idparameter}`, function(err) {
				if (err) {
					error += err.message;
				} else {
					connection.query(`DELETE FROM Parameters WHERE id=${req.params.idparameter}`, function (err, rows2, fields) {
						if(error)
							res.status(500).json({ "status_code1": 500, "status_message": error });
						else
							res.send(`Delete parameter!`);
					});
					connection.end();
				}
			});
		}
	});		
});


router.post('/:id/:idendpoint/addvulnerability', function (req, res, next) {
	var error = '';
	var connection = config.getMySQLConnection();
	connection.connect();
	connection.query(`INSERT INTO Vulnerabilities (vulName, screenshot, note, consequence, requestPayload, responseServer, vulState, endpointId) VALUES ('${req.body.vulName}','${req.body.screenshot}','${req.body.note}','${req.body.consequence}','${req.body.requestPayload}','${req.body.responseServer}',${req.body.vulState},'${req.params.idendpoint}')`, function (err, rows, fields) {
		if (err) {
			error += err.message;
		} else {
			if (err) {
				errinternal = 'err';
				res.status(500).json({"status_code": 500,"status_message": '1:'+err.message});
			} else {
				correlation = rows.insertId;
				if (req.body.linkedParameterID != null){
					connection.query(`INSERT INTO VulnParameters (vulnerabilityId, parameterId) VALUES (${rows.insertId},${req.body.linkedParameterID})`, function(err, rows2, fields) {
						if (err) {
							errinternal = 'err';
							res.status(500).json({"status_code": 500,"status_message": '2:'+err.message});
						}
					});
				}
				if(req.body.vulState==0){
					connection.query(`UPDATE Vulnerabilities SET closingDate=NOW() WHERE id=${rows.insertId}`, function (err, rows2, fields) {
						if (err) {
							errinternal = 'err';
							res.status(500).json({"status_code": 500,"status_message": '2:'+err.message});
						}
					});
				}
				connection.end();
				if(error){
					res.status(500).json({ "status_code1": 500, "status_message": '3:'+error });
				}
				else{
					res.send(`Vulnerability created with id: ${rows.insertId}`);
				}
									
			}
		}
	});
});

router.get('/:id/:idendpoint/allvulnerabilities', function(req, res) {
	var vulnerabilityList = [];
	
	var connection = config.getMySQLConnection();
	connection.connect();
	connection.query(`SELECT * FROM Vulnerabilities WHERE endpointId='${req.params.idendpoint}'`, function(err, rows, fields) {
	  	if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": err.message});
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
					'creationDate':rows[i].creationDate,
					'closingDate':rows[i].closingDate,
					'endpointId':rows[i].endpointId
		  		}
		  		vulnerabilityList.push(vulnerability);
	  	}
	  	
	  	res.send(vulnerabilityList);
	  	}
	});
	
	connection.end();	
});

router.get('/:id/:idendpoint/vul/:idvulnerability', function(req, res) {
	var vulnerabilityList = [];
	var connection = config.getMySQLConnection();
	connection.connect();
	
	connection.query(`SELECT * FROM Vulnerabilities WHERE id=${req.params.idvulnerability} AND endpointId=${req.params.idendpoint}`, function(err, rows, fields) {
	  	if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": err.message});
	  	} else {
	  		
	  		if(rows.length==1) {
		  		var vulnerability = {
		  			'id':rows[0].id,
			  		'vulName':rows[0].vulName,
			  		'screenshot':rows[0].screenshot,
					'note':rows[0].note,
					'consequence':rows[0].consequence,
					'requestPayload':rows[0].requestPayload,
					'responseServer':rows[0].responseServer,
					'vulState':rows[0].vulState,
					'creationDate':rows[0].creationDate,
					'closingDate':rows[0].closingDate,
					'endpointId':rows[0].endpointId
		  		}
				vulnerabilityList.push(vulnerability);
	  	} 	
	  	res.send(vulnerabilityList);
	  	}
	});
	connection.end();	
});

router.put('/:id/:idendpoint/vul/:idvulnerability', function (req, res) {
	var error = '';
	var connection = config.getMySQLConnection();
	connection.connect();
	connection.query(`UPDATE Vulnerabilities SET vulName='${req.body.vulName}', screenshot='${req.body.screenshot}', note='${req.body.note}', consequence='${req.body.consequence}', requestPayload='${req.body.requestPayload}', responseServer='${req.body.responseServer}', vulState='${req.body.vulState}', endpointId='${req.params.idendpoint}' WHERE id=${req.params.idvulnerability}`, function(err) {
	  	if (err) {
			error += err.message;
	  	} else {
			if(req.body.vulState==0){
				connection.query(`UPDATE Vulnerabilities SET closingDate=NOW() WHERE id=${req.params.idvulnerability}`, function (err, rows2, fields) {
					if(error) {
						res.status(500).json({ "status_code1": 500, "status_message": error });
					} else {
						connection.query(`DELETE FROM VulnParameters WHERE vulnerabilityId=${req.params.idvulnerability}`, function (err, rows2, fields) {
							if(error)
								res.status(500).json({ "status_code1": 500, "status_message": error });
							else
								res.send(`Vulnerability updated successfully!`);
						});
					}
				});
			} else {
				connection.query(`UPDATE Vulnerabilities SET closingDate=NULL WHERE id=${req.params.idvulnerability}`, function(err, rows4, fields) {	
					connection.query(`SELECT COUNT(vulnerabilityId) FROM VulnParameters WHERE vulnerabilityId=${req.params.idvulnerability}`, function(err, rows3, fields) {
						if (err) {
							error += err.message;
						} else {
							const rowData = rows3[0];
							const countValue = rowData['COUNT(vulnerabilityId)'];
							if(countValue==0){
								connection.query(`INSERT INTO VulnParameters (vulnerabilityId, parameterId) VALUES (${req.params.idvulnerability},${req.body.linkedParameterID})`, function(err, rows4, fields) {
									if (err) {
										error += err.message;
									}
								});						
							} else {
								connection.query(`UPDATE VulnParameters SET vulnerabilityId='${req.params.idvulnerability}', parameterId='${req.body.linkedParameterID}' WHERE vulnerabilityId=${req.params.idvulnerability}`, function(err, rows5, fields) {
									if (err) {
										error += err.message;
									}
								});
							}
							if(error)
								res.status(500).json({ "status_code1": 500, "status_message": error });
							else
								res.send(`Vulnerability updated successfully!`);
							connection.end();
						}			
					});
				});							
			}				
	  	}
	});
});

router.delete('/:id/:idendpoint/vul/:idvulnerability', function (req, res) {
	var error = '';
	var connection = config.getMySQLConnection();
	connection.connect();
	connection.query(`DELETE FROM VulnParameters WHERE vulnerabilityId=${req.params.idvulnerability}`, function(err) {
		if (err) {
			error += err.message;
		} else {
			connection.query(`DELETE FROM Vulnerabilities WHERE id=${req.params.idvulnerability}`, function (err, rows2, fields) {
				if(error)
					res.status(500).json({ "status_code1": 500, "status_message": error });
				else
					res.send(`Delete vulnerability!`);
			});
			connection.end();
		}
	});	
});

module.exports = router;