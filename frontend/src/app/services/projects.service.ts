import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project.model';


@Injectable({
  providedIn: 'root'
})

export class ProjectsService {

  url = 'http://localhost:3000/projects/';
  urlExploreAll = 'http://localhost:3000/explore/projects/';

  constructor(private http: HttpClient) {}

  getProjects(){
    return this.http.get<Project[]>(this.urlExploreAll);
  }

  getProjectById(id: string){
    return this.http.get<Project[]>(this.url + id);
  }

  insertProject(projectName: string){
    return this.http.post(this.url, {
      request: "createProject",
      projectName: projectName
    }, {
      responseType: 'text'
    });
  }

  editProjectById(id: string, projectName: string){
    return this.http.put(this.url + id, {
      request: "editProject",
      projectName: projectName
    }, {
      responseType: 'text'
    });
  }

  deleteProjectById(id: string){
    return this.http.delete(this.url + id, {
      responseType: 'text'
    });
  }

}
