import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Endpoint } from '../models/endpoint.model';
import { EndCorr } from '../models/endcorr.model';

@Injectable({
  providedIn: 'root'
})

export class EndpointsService {
  url = 'http://localhost:3000/projects/';
  apiGetAllEndpoints = '/allendpoints';
  apiGetAllDomains = '/alldomains';
  apiInsertEndpoint = '/addendpoint';
  apiUpdateEndpoint = '/addendpoint';
  apiGetEndpointCorrelation = '/showendpointcorr';
  apiUpdateTestCheck= '/updateTestCheck';
  apiRefreshTestCheck = '/refreshTestCheck';

  constructor(private http: HttpClient) {}

  getEndpointsProject(id: string){
    return this.http.get<Endpoint[]>(this.url + id + this.apiGetAllEndpoints);
  }

  getDomainsProject(id: string){
    return this.http.get<Endpoint[]>(this.url + id + this.apiGetAllDomains);
  }

  getEndpointsCorrelations(id: string, idendpoint: string){
    return this.http.get<EndCorr[]>(this.url + id + '/' + idendpoint + this.apiGetEndpointCorrelation);
  }

  getEndpointsProjectByIdEndpoint(id: string, idendpoint: string){
    return this.http.get<Endpoint[]>(this.url + id + '/' + idendpoint);
  }

  insertEndpoint(id: string, pathUI: string, domain: string, endpoint: string, apiDescription: string, linkedEndpointID: string){
    return this.http.post(this.url + id + this.apiInsertEndpoint, {
      request: "createEndpoint",
      id: id,
      pathUI: pathUI,
      domain: domain,
      endpoint: endpoint,
      apiDescription: apiDescription,
      linkedEndpointID: linkedEndpointID
    }, {
      responseType: 'text'
    });
  }

  updateEndpoint(id: string, idendpoint: string, pathUI: string, domain: string, endpoint: string, apiDescription: string, linkedEndpointID: string){
    return this.http.put(this.url + id + '/' + idendpoint, {
      request: "updateEndpoint",
      id: id,
      pathUI: pathUI,
      domain: domain,
      endpoint: endpoint,
      apiDescription: apiDescription,
      linkedEndpointID: linkedEndpointID,
      idendpoint: idendpoint
    }, {
      responseType: 'text'
    });
  }



  deleteEndpointByID(id: string, idendpoint: string){
    return this.http.delete(this.url + id + '/' + idendpoint, {
      responseType: 'text'
    });
  }

  updateTestCheck(id: string, idendpoint: string){
    return this.http.put(this.url + id + '/' + idendpoint + this.apiUpdateTestCheck, {
      request: "updateTestCheck"
    },{
      responseType: 'text'
    });
  }

  refreshTestCheck(id: string){
    return this.http.put(this.url + id + this.apiRefreshTestCheck, {
      request: "refreshTestCheck"
    },{
      responseType: 'text'
    });
  }

}
