import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vulnerability } from '../models/vulnerability.model';
import { Vulparam } from '../models/vulparam.model';

@Injectable({
  providedIn: 'root'
})
export class VulnerabilitiesService {
  url = 'http://localhost:3000/projects/';
  apiGetAllVulnerabilities = '/allvulnerabilities';
  apiInsertVulnerability = '/addvulnerability';
  apiEditVulnerability = '/vul/';
  apiGetAllVulnerabilitiesProject = '/viewtabvulparameter';
  //apiUpdateEndpoint = '/addendpoint';

  constructor(private http: HttpClient) {}

  getVulnerabilitiesProject(id: string, idendpoint: string){
    return this.http.get<Vulparam[]>(this.url + id + '/' + idendpoint + this.apiGetAllVulnerabilitiesProject);
  }

  getVulnerabilitiesEndpointProject(id: string, idendpoint: string){
    return this.http.get<Vulnerability[]>(this.url + id + '/' + idendpoint + this.apiGetAllVulnerabilities);
  }

  getVulnerabilitiesEndpointProjectById(id: string, idendpoint: string, idvulnerability: string){
    return this.http.get<Vulnerability[]>(this.url + id + '/' + idendpoint + this.apiEditVulnerability + idvulnerability);
  }


  insertVulnerability(id: string, idendpoint: string,  vulName: string, screenshot: string, note: string, consequence: string, requestPayload:string, responseServer: string, vulState: boolean, linkedParameterID: string){
    return this.http.post(this.url + id + '/' + idendpoint + this.apiInsertVulnerability, {
      request: "createVulnerability",
      vulName: vulName,
      screenshot: screenshot,
      note: note,
      consequence: consequence,
      requestPayload: requestPayload,
      responseServer: responseServer,
      vulState: vulState,
      endpointId: idendpoint,
      linkedParameterID: linkedParameterID
    }, {
      responseType: 'text'
    });
  }

  deleteVulnerabilityEndpointByID(id: string, idendpoint: string, idvulnerability: string){
    return this.http.delete(this.url + id + '/' + idendpoint + this.apiEditVulnerability + idvulnerability, {
      responseType: 'text'
    });
  }


  updateVulnerabilityEndpoint(id: string, idendpoint: string, idvulnerability: string, vulName: string, screenshot: string, note: string, consequence: string, requestPayload:string, responseServer: string, vulState: boolean, linkedParameterID: string){
    return this.http.put(this.url + id + '/' + idendpoint + this.apiEditVulnerability + idvulnerability, {
      request: "updateVulnerability",
      id: id,
      vulName: vulName,
      screenshot: screenshot,
      note: note,
      consequence: consequence,
      requestPayload: requestPayload,
      responseServer: responseServer,
      vulState: vulState,
      endpointId: idendpoint,
      linkedParameterID: linkedParameterID
    }, {
      responseType: 'text'
    });
  }
}
