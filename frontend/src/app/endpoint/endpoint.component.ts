import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Endpoint } from '../models/endpoint.model';
import { EndpointsService } from '../services/endpoints.service';
import { ParametersService } from '../services/parameters.service';
import { Parameter } from '../models/parameter.model';
import { VulnerabilitiesService } from '../services/vulnerabilities.service';
import { Vulnerability } from '../models/vulnerability.model';

@Component({
  selector: 'app-endpoint',
  templateUrl: './endpoint.component.html',
  styleUrls: ['./endpoint.component.css']
})

export class EndpointComponent implements OnInit {
  Endpoint: Endpoint[] = new Array();
  Parameter: Parameter[] = new Array();
  Vulnerability: Vulnerability[] = new Array();
  addParameterForm!: FormGroup;
  addVulnerabilityForm!: FormGroup;
  id: string | null;
  idendpoint: string | null;
  selectedLinkedParameterID!: string | null;
  screenShot: string;

  selectField: FormControl = new FormControl();
  baseUrl = 'http://localhost:3000/projects/';

  constructor(private endpoints: EndpointsService, private parameters: ParametersService, private vulnerabilities: VulnerabilitiesService, private route: ActivatedRoute, public http: HttpClient, public fb: FormBuilder) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.idendpoint = this.route.snapshot.paramMap.get('idendpoint');
    this.screenShot = '';
  }

  ngOnInit(): void {

    // onload fetch the endpoint by the endpointID for the current project ID
    this.endpoints.getEndpointsProjectByIdEndpoint(this.id!, this.idendpoint!).subscribe(res => {
      this.Endpoint = res;
      console.log(this.Endpoint);
    })

    this.addParameterForm = new FormGroup({
      parameterName: new FormControl(null, Validators.required),
      note: new FormControl(null)
    })

    this.addVulnerabilityForm = new FormGroup({
      vulName: new FormControl(null, Validators.required),
      screenshot: new FormControl(null),
      note: new FormControl(null),
      consequence: new FormControl(null),
      requestPayload: new FormControl(null),
      responseServer: new FormControl(null),
      vulState: new FormControl(null, Validators.required),
      linkedParameterID: new FormControl(null)
    })

    this.parameters.getParametersEndpointProject(this.id!, this.idendpoint!).subscribe(res => {
      this.Parameter = res;
      console.log(this.Parameter);
    });

    this.vulnerabilities.getVulnerabilitiesEndpointProject(this.id!, this.idendpoint!).subscribe(res => {
      this.Vulnerability = res;
      console.log(this.Vulnerability);
    });

  }

  deleteEndpointById(): void {
    this.endpoints.deleteEndpointByID(this.id!, this.idendpoint!).subscribe(res => {
      alert(res);
      console.log(res);
    });
  }

  updateTestCheck(): void {
    this.endpoints.updateTestCheck(this.id!, this.idendpoint!).subscribe(res => {
      alert(res);
      console.log(res);
    });
  }

  createParameter() {
    this.parameters.insertParameter(
      this.id!,
      this.idendpoint!,
      this.addParameterForm.value.parameterName,
      this.addParameterForm.value.note
    ).subscribe(res => {
      alert(res);
      console.log(res);
    });
  }

  createVulnerability() {
    if(this.addVulnerabilityForm.value.screenshot != null){
      this.screenShot = this.addVulnerabilityForm.value.screenshot.replace("C:\\fakepath\\", "")
    }
    else{
      this.screenShot = this.addVulnerabilityForm.value.screenshot
    }
    this.vulnerabilities.insertVulnerability(
      this.id!,
      this.idendpoint!,
      this.addVulnerabilityForm.value.vulName,
      this.screenShot,
      this.addVulnerabilityForm.value.note,
      this.addVulnerabilityForm.value.consequence,
      this.addVulnerabilityForm.value.requestPayload,
      this.addVulnerabilityForm.value.responseServer,
      this.addVulnerabilityForm.value.vulState,
      this.addVulnerabilityForm.value.linkedParameterID
    ).subscribe(res => {
      alert(res);
      console.log(res);
    });
  }

}
