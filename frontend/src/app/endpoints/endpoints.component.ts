import { Component, OnInit} from '@angular/core';
import { Endpoint } from '../models/endpoint.model';
import { ActivatedRoute } from '@angular/router';
import { EndpointsService } from '../services/endpoints.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SearchEndpoints } from '../models/search-endpoints.model';

@Component({
  selector: 'app-endpoints',
  templateUrl: './endpoints.component.html',
  styleUrls: ['./endpoints.component.css']
})

export class EndpointsComponent implements OnInit {
  Endpoint: Endpoint[] = new Array();
  Domain: Endpoint[] = new Array();
  EndpointsByDomain: Endpoint[] = new Array();
  id: string | null;
  idendpoint: string | null;
  searchEndpointForm: FormGroup;
  EndpointForm: FormGroup;
  loading: boolean = false;
  selectedDomain!: string | null;
  Endpoints: SearchEndpoints[] = new Array();
  url = 'http://localhost:3000/projects/';
  apiSearchEndpoint ='/allendpoints/searchEndpoint';
  apiGetAllEndpointsByDomains = '/allendpointsByDomain';


  constructor(private endpoints: EndpointsService, public http: HttpClient, private route: ActivatedRoute, public fb: FormBuilder) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.idendpoint = this.route.snapshot.paramMap.get('idendpoint');
    this.searchEndpointForm = fb.group({
      "valueSearch": ['', Validators.required] 
    });
    this.EndpointForm = fb.group({
      "selectedDomain": ['', Validators.required] 
    });
  }

  ngOnInit(): void {
    this.endpoints.getEndpointsProject(this.id!).subscribe(res => {
      this.Endpoint = res;
      console.log(this.Endpoint);
    });

    this.endpoints.getDomainsProject(this.id!).subscribe(res => {
      this.Domain = res;
      console.log(this.Domain);
    });
  }

  getEndpointsByDomain(){
    this.loading = true;
    this.http.post<Endpoint[]>(this.url+this.id +this.apiGetAllEndpointsByDomains, {
      request: "EndpointsByDomain",
      selectedDomain: this.EndpointForm.controls['selectedDomain'].value
    }).subscribe(res => {
      this.EndpointsByDomain = res;
      console.log(this.EndpointsByDomain);
      this.loading = false;
    });
  }

  endpointSearch() {
    if(!this.searchEndpointForm.valid){
      alert("Compilare tutti i campi")
      return;
    }
    this.loading = true;
    this.http.post<SearchEndpoints[]>(this.url+this.id+this.apiSearchEndpoint, {
      request: "searchEndpoints",
      valueSearch: this.searchEndpointForm.controls['valueSearch'].value
    }).subscribe(res => {
      this.Endpoints = res;
      console.log(this.Endpoints);
      this.loading = false;
    });
  }

  refreshTestCheck(): void {
    this.endpoints.refreshTestCheck(this.id!).subscribe(res => {
      alert(res);
      console.log(res);
    });
  }
}
