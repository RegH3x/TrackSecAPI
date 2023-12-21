import { Component, OnInit} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { EndCorr } from '../models/endcorr.model';
import { EndpointsService } from '../services/endpoints.service';

@Component({
  selector: 'app-endpointcorr',
  templateUrl: './endpointcorr.component.html',
  styleUrls: ['./endpointcorr.component.css']
})
export class EndpointcorrComponent implements OnInit {
  loading: boolean = false;
  Endcorrs: EndCorr[] = new Array();
  id: string | null;
  idendpoint: string | null;

  constructor(private endpoints: EndpointsService, public route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.idendpoint = this.route.snapshot.paramMap.get('idendpoint');
  }

  ngOnInit(): void {
    this.endpoints.getEndpointsCorrelations(this.id!, this.idendpoint!).subscribe(res => {
      this.Endcorrs = res;
      console.log(this.Endcorrs);
    })
  }
  
}
