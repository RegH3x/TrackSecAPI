import { Component, OnInit} from '@angular/core';
import { Project } from '../models/project.model';
import { ProjectsService } from '../services/projects.service';
import { HttpClient} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SearchEndpoints } from '../models/search-endpoints.model';
import { SearchParameters } from '../models/search-parameters.model';
import { SearchVulnerabilities } from '../models/search-vulnerabilities.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})

export class ProjectsComponent implements OnInit {
  allProjects: Project[] = new Array();
  Endpoints: SearchEndpoints[] = new Array();
  Parameters: SearchParameters[] = new Array();
  Vulnerabilities: SearchVulnerabilities[] = new Array();
  id: string | null;
  idendpoint: string | null;
  idparameter: string | null;
  idvulnerability: string | null;
  loading: boolean = false;
  completeSearchForm: FormGroup;
  selectedProjects!: string | null;
  urlExploreAll = 'http://localhost:3000/explore/';
  apiSearchInAllProject ='searchInAllProjects';

  constructor(private projects: ProjectsService, public http: HttpClient, public route: ActivatedRoute, public fb: FormBuilder) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.idendpoint = this.route.snapshot.paramMap.get('idendpoint');
    this.idparameter = this.route.snapshot.paramMap.get('idparameter');
    this.idvulnerability = this.route.snapshot.paramMap.get('idvulnerability');
    this.completeSearchForm = fb.group({
      "searchType": ['', Validators.required],
      "valueSearch": ['', Validators.required],
      "listOfProject": ['', Validators.required]  
    });
  }

  ngOnInit(): void {
    this.projects.getProjects().subscribe(res => {
        this.allProjects = res;
        console.log(this.allProjects);
      });
  }

  completeSearch() {
    if(!this.completeSearchForm.valid){
      alert("Compilare tutti i campi")
      return;
    }
    this.loading = true;
    if(this.completeSearchForm.controls['searchType'].value == 'Endpoints'){
      this.http.post<SearchEndpoints[]>(this.urlExploreAll+this.apiSearchInAllProject, {
        request: "searchEndpoints",
        searchType: this.completeSearchForm.controls['searchType'].value,
        valueSearch: this.completeSearchForm.controls['valueSearch'].value,
        listOfProject: (this.completeSearchForm.controls['listOfProject'].value).join(', ')
      }).subscribe(res => {
        this.Endpoints = res;
        console.log(this.Endpoints);
        this.loading = false;
      });
    }
    if(this.completeSearchForm.controls['searchType'].value == 'Parameters'){
      this.http.post<SearchParameters[]>(this.urlExploreAll+this.apiSearchInAllProject, {
        request: "searchParameter",
        searchType: this.completeSearchForm.controls['searchType'].value,
        valueSearch: this.completeSearchForm.controls['valueSearch'].value,
        listOfProject: this.completeSearchForm.controls['listOfProject'].value.join(', ')
      }).subscribe(res => {
        this.Parameters = res;
        console.log(this.Parameters);
        this.loading = false;
      });
    }
    if(this.completeSearchForm.controls['searchType'].value == 'Vulnerabilities'){
      this.http.post<SearchVulnerabilities[]>(this.urlExploreAll+this.apiSearchInAllProject, {
        request: "searchVulnerabilities",
        searchType: this.completeSearchForm.controls['searchType'].value,
        valueSearch: this.completeSearchForm.controls['valueSearch'].value,
        listOfProject: (this.completeSearchForm.controls['listOfProject'].value).join(', ')
      }).subscribe(res => {
        this.Vulnerabilities = res;
        console.log(this.Vulnerabilities);
        this.loading = false;
      });
    }
  }
}
