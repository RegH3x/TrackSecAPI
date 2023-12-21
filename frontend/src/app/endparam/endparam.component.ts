import { Component, OnInit} from '@angular/core';
import { Endparam } from '../models/endparam.model';
import { ActivatedRoute } from '@angular/router';
import { ParametersService } from '../services/parameters.service';

@Component({
  selector: 'app-endparam',
  templateUrl: './endparam.component.html',
  styleUrls: ['./endparam.component.css']
})
export class EndparamComponent implements OnInit {
  Endparam: Endparam[] = new Array();
  id: string | null;

  constructor(private parameters: ParametersService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    // onload fetch the endpoint by the endpointID for the current project ID
    this.parameters.getParametersProject(this.id!).subscribe(res => {
      this.Endparam = res;
      console.log(this.Endparam);
    })
  }

}
