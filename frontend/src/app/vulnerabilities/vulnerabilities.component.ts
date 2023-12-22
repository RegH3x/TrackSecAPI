import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vulnerability } from '../models/vulnerability.model';
import { VulnerabilitiesService } from '../services/vulnerabilities.service';

@Component({
  selector: 'app-vulnerabilities',
  templateUrl: './vulnerabilities.component.html',
  styleUrls: ['./vulnerabilities.component.css']
})

export class VulnerabilitiesComponent implements OnInit {
  loading: boolean = false;
  Vulnerability: Vulnerability[] = new Array();
  id: string | null;
  idendpoint: string | null;

  constructor(private vulnerabilities: VulnerabilitiesService, public route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.idendpoint = this.route.snapshot.paramMap.get('idendpoint');
  }

  ngOnInit(): void {
    // onload fetch all endpoints for current project ID
    this.vulnerabilities.getVulnerabilitiesEndpointProject(this.id!, this.idendpoint!).subscribe(res => {
      this.Vulnerability = res;
      console.log(this.Vulnerability);
    });
  }
}