import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Endpoint } from '../models/endpoint.model';
import { EndpointsService } from '../services/endpoints.service';

@Component({
  selector: 'app-editendpoint',
  templateUrl: './editendpoint.component.html',
  styleUrls: ['./editendpoint.component.css']
})

export class EditendpointComponent implements OnInit {
  Endpoints: Endpoint[] = new Array();
  Endpoint: Endpoint[] = new Array();
  updateEndpointForm!: FormGroup;
  id: string | null;
  idendpoint: string | null;
  selectedLinkedEndpointID!: string | null;

  constructor(private endpoints: EndpointsService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.idendpoint = this.route.snapshot.paramMap.get('idendpoint');
  }

  ngOnInit(): void {
    this.endpoints.getEndpointsProject(this.id!).subscribe(res => {
      this.Endpoints = res;
      console.log(this.Endpoints);
    });

    this.updateEndpointForm = new FormGroup({
      pathUI: new FormControl(),
      domain: new FormControl(),
      endpoint: new FormControl(),
      apiDescription: new FormControl(),
      linkedEndpointID: new FormControl(),
    })

    this.endpoints.getEndpointsProjectByIdEndpoint(this.id!, this.idendpoint!).subscribe(res => {
      this.Endpoint = res;
      this.updateEndpointForm.get("pathUI")!.setValue(this.Endpoint[0].pathUI);
      this.updateEndpointForm.get("domain")!.setValue(this.Endpoint[0].domain);
      this.updateEndpointForm.get("endpoint")!.setValue(this.Endpoint[0].endpoint);
      this.updateEndpointForm.get("apiDescription")!.setValue(this.Endpoint[0].apiDescription);
      console.log(this.Endpoint);
    })
  }



  editEndpoint() {
    this.endpoints.updateEndpoint(
      this.id!,
      this.idendpoint!,
      this.updateEndpointForm.value.pathUI,
      this.updateEndpointForm.value.domain,
      this.updateEndpointForm.value.endpoint,
      this.updateEndpointForm.value.apiDescription,
      this.updateEndpointForm.value.linkedEndpointID
    ).subscribe(res => {
      alert(res);
      console.log(res);
    });
  }
}
