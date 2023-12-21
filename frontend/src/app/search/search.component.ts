import { Component, OnInit} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Param } from '../models/param.model';
import { Vuln } from '../models/vuln.model';
import { VulnParam } from '../models/vulnparam.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  loading: boolean = false;
  searchParamForm: FormGroup;
  searchVulnForm: FormGroup;
  searchVulnParamForm: FormGroup;
  id: string | null;
  params: Param[] = new Array();
  vulns: Vuln[] = new Array();
  vulnparams: VulnParam[] = new Array();

  constructor(public http: HttpClient, public route: ActivatedRoute, public fb: FormBuilder) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.searchParamForm = fb.group({
      "parameterName": ['', Validators.required]    
    });
    this.searchVulnForm = fb.group({
      "vulName": ['', Validators.required]    
    });
    this.searchVulnParamForm = fb.group({
      "parameterName": ['', Validators.required]    
    });
  }

  ngOnInit(): void {
  }
  baseUrl = 'http://localhost:3000/projects/'
  apiSearchParameters = '/allparametersforproject';
  apiSearchVulnerability = '/allvulnerabilitiesforproject';
  apiSearchVulnParameters = '/searchvulPara';
  
  searchParam() {
    if(!this.searchParamForm.valid){
      alert("Compilare tutti i campi")
      return;
    }
    this.loading = true;
    this.http.post<Param[]>(this.baseUrl+this.id+this.apiSearchParameters, {
      request: "searchParam",
      parameterName: this.searchParamForm.controls['parameterName'].value
    }).subscribe(res => {
      this.params = res;
      console.log(this.params);
      this.loading = false;
    });
  }

  searchVuln() {
    if(!this.searchVulnForm.valid){
      alert("Compilare tutti i campi")
      return;
    }
    this.loading = true;
    this.http.post<Vuln[]>(this.baseUrl+this.id+this.apiSearchVulnerability, {
      request: "searchVuln",
      vulName: this.searchVulnForm.controls['vulName'].value
    }).subscribe(res => {
      this.vulns = res;
      console.log(this.vulns);
      this.loading = false;
    });
  }

  searchVulnParam() {
    if(!this.searchVulnParamForm.valid){
      alert("Compilare tutti i campi")
      return;
    }
    this.loading = true;
    this.http.post<VulnParam[]>(this.baseUrl+this.id+this.apiSearchVulnParameters, {
      request: "searchVulnParam",
      parameterName: this.searchVulnParamForm.controls['parameterName'].value
    }).subscribe(res => {
        this.vulnparams = res;
        console.log(this.vulnparams);
        this.loading = false;
    });
  }
}