import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectsService } from '../services/projects.service';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})

export class AddprojectComponent implements OnInit {
  addProjectForm!: FormGroup;

  constructor(private projects: ProjectsService) { }

  ngOnInit(): void {
    this.addProjectForm = new FormGroup({
      projectName: new FormControl(null, Validators.required)
    })
  }

  createProject(): void {
    console.log(this.addProjectForm)

    this.projects.insertProject(
      this.addProjectForm.value.projectName
      ).subscribe(res => {
        alert(res);
        console.log(res);
      });
  }
}
