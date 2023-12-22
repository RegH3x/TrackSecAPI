import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ParametersService } from '../services/parameters.service';
import { Parameter } from '../models/parameter.model';

@Component({
  selector: 'app-editparameter',
  templateUrl: './editparameter.component.html',
  styleUrls: ['./editparameter.component.css']
})

export class EditparameterComponent implements OnInit {
  updateParameterForm!: FormGroup;
  id: string | null;
  idendpoint: string | null;
  idparameter: string | null;
  Parameter: Parameter[] = new Array();

  constructor(private parameters: ParametersService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.idendpoint = this.route.snapshot.paramMap.get('idendpoint');
    this.idparameter = this.route.snapshot.paramMap.get('idparameter');
  }

  ngOnInit(): void {
    this.updateParameterForm = new FormGroup({
      parameterName: new FormControl(),
      note: new FormControl()
    })

    this.parameters.getParametersEndpointProjectById(this.id!, this.idendpoint!, this.idparameter!).subscribe(res => {
      this.Parameter = res;
      this.updateParameterForm.get("parameterName")!.setValue(this.Parameter[0].parameterName);
      this.updateParameterForm.get("note")!.setValue(this.Parameter[0].note);
      console.log(this.Parameter);
    })


  }

  editParameter() {
    this.parameters.updateParameterEndpoint(
      this.id!,
      this.idendpoint!,
      this.idparameter!,
      this.updateParameterForm.value.parameterName,
      this.updateParameterForm.value.note
    ).subscribe(res => {
      alert(res);
      console.log(res);
    });
  }

}
