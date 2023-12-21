import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParametersService } from '../services/parameters.service';
import { Parameter } from '../models/parameter.model';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css']
})

export class ParametersComponent implements OnInit {
  Parameter: Parameter[] = new Array();
  id: string | null;
  idendpoint: string | null;


  constructor(private parameters: ParametersService, public route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.idendpoint = this.route.snapshot.paramMap.get('idendpoint');
  }

  ngOnInit(): void {
    // onload fetch all endpoints for current project ID
    this.parameters.getParametersEndpointProject(this.id!, this.idendpoint!).subscribe(res => {
      this.Parameter = res;
      console.log(this.Parameter);
    });
  }

}
