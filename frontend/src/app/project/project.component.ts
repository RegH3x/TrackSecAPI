import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../models/project.model';
import { Endpoint } from '../models/endpoint.model';
import { ProjectsService } from '../services/projects.service';
import { EndpointsService } from '../services/endpoints.service';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent implements OnInit {
  Project: Project[] = new Array();
  Endpoint: Endpoint[] = new Array();
  id: string | null;
  addEndpointForm!: FormGroup;
  selectedLinkedEndpointID!: string | null;

  selectField: FormControl = new FormControl();
  baseUrl = 'http://localhost:3000/projects/';

  constructor(private projects: ProjectsService, private endpoints: EndpointsService, private route: ActivatedRoute, public http: HttpClient, public fb: FormBuilder) {
    this.id = this.route.snapshot.paramMap.get('id');  
  }

  ngOnInit(): void {

    // onload fetch the current project by ID
    this.projects.getProjectById(this.id!).subscribe(res => {
      this.Project = res;
      console.log(this.Project);
    });

    this.addEndpointForm = new FormGroup({
      pathUI: new FormControl(null, Validators.required),
      domain: new FormControl(null, Validators.required),
      endpoint: new FormControl(null, Validators.required),
      apiDescription: new FormControl(null),
      linkedEndpointID: new FormControl(null),
    })

    this.endpoints.getEndpointsProject(this.id!).subscribe(res => {
      this.Endpoint = res;
      console.log(this.Endpoint);
    });

  }

  deleteProjectById(): void {
    this.projects.deleteProjectById(this.id!).subscribe(res => {
      alert(res);
      console.log(res);
    });
  }

  createEndpoint(): void {
    this.endpoints.insertEndpoint(
      this.id!,
      this.addEndpointForm.value.pathUI,
      this.addEndpointForm.value.domain,
      this.addEndpointForm.value.endpoint,
      this.addEndpointForm.value.apiDescription,
      this.addEndpointForm.value.linkedEndpointID
    ).subscribe(res => {
      alert(res);
      console.log(res);
    });
  }
}
