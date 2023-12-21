import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Parameter } from '../models/parameter.model';
import { ParametersService } from '../services/parameters.service';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.css']
})
export class ParameterComponent implements OnInit {
  Parameter: Parameter[] = new Array();
  id: string | null;
  idendpoint: string | null;
  idparameter: string | null;

  baseUrl = 'http://localhost:3000/projects/';

  constructor(private parameters: ParametersService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.idendpoint = this.route.snapshot.paramMap.get('idendpoint');
    this.idparameter = this.route.snapshot.paramMap.get('idparameter');
  }

  ngOnInit(): void {

    // onload fetch the endpoint by the endpointID for the current project ID
    this.parameters.getParametersEndpointProjectById(this.id!, this.idendpoint!, this.idparameter!).subscribe(res => {
      this.Parameter = res;
      console.log(this.Parameter);
    })

  }

  deleteParameterEndpointById(): void {
    this.parameters.deleteParameterEndpointByID(this.id!, this.idendpoint!, this.idparameter!).subscribe(res => {
      alert(res);
      console.log(res);
    });
  }

}
