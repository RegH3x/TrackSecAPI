import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Parameter } from '../models/parameter.model';
import { Endparam } from '../models/endparam.model';

@Injectable({
  providedIn: 'root'
})

export class ParametersService {
  url = 'http://localhost:3000/projects/';
  apiGetAllParametersEndpoint = '/allparameters';
  apiInsertParameter = '/addparameter';
  apiEditParameter = '/par/';
  apiGetAllParametersProject = '/viewtabendparameter';

  constructor(private http: HttpClient) {}

  getParametersProject(id: string){
    return this.http.get<Endparam[]>(this.url + id + this.apiGetAllParametersProject);
  }


  getParametersEndpointProject(id: string, idendpoint: string){
    return this.http.get<Parameter[]>(this.url + id + '/' + idendpoint + this.apiGetAllParametersEndpoint);
  }

  getParametersEndpointProjectById(id: string, idendpoint: string, idparameter: string){
    return this.http.get<Parameter[]>(this.url + id + '/' + idendpoint + this.apiEditParameter + idparameter);
  }


  insertParameter(id: string, idendpoint: string,  parameterName: string, note: string){
    return this.http.post(this.url + id + '/' + idendpoint + this.apiInsertParameter, {
      request: "createParameter",
      parameterName: parameterName,
      note: note,
      endpointId: idendpoint
    }, {
      responseType: 'text'
    });
  }

  deleteParameterEndpointByID(id: string, idendpoint: string, idparameter: string){
    return this.http.delete(this.url + id + '/' + idendpoint + this.apiEditParameter + idparameter, {
      responseType: 'text'
    });
  }


  updateParameterEndpoint(id: string, idendpoint: string, idparameter: string, parameterName: string, note: string){
    return this.http.put(this.url + id + '/' + idendpoint + this.apiEditParameter + idparameter, {
      request: "updateParameter",
      id: id,
      parameterName: parameterName,
      note: note,
      endpointId: idendpoint
    }, {
      responseType: 'text'
    });
  }


}
