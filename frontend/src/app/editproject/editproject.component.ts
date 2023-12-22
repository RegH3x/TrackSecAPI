import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../services/projects.service';
import { Project } from '../models/project.model';


@Component({
  selector: 'app-editproject',
  templateUrl: './editproject.component.html',
  styleUrls: ['./editproject.component.css']
})
export class EditprojectComponent implements OnInit {
  updateProjectForm!: FormGroup;
  id: string | null;
  Project: Project[] = new Array();

  constructor(private projects: ProjectsService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.updateProjectForm = new FormGroup({
      projectName: new FormControl(),
    })

    this.projects.getProjectById(this.id!).subscribe(res => {
      this.Project = res;
      this.updateProjectForm.get("projectName")!.setValue(this.Project[0].projectName);
      console.log(this.Project);
    });
  }

  editProject() {
    this.projects.editProjectById(
      this.id!, this.updateProjectForm.value.projectName
      ).subscribe(res => {
        alert(res);
        console.log(res);
      });
  }


}
