import { Component, OnInit} from '@angular/core';
import { Vulparam } from '../models/vulparam.model';
import { ActivatedRoute } from '@angular/router';
import { VulnerabilitiesService } from '../services/vulnerabilities.service';

@Component({
  selector: 'app-vulnparam',
  templateUrl: './vulnparam.component.html',
  styleUrls: ['./vulnparam.component.css']
})

export class VulnparamComponent implements OnInit {
  loading: boolean = false;
  Vulparam: Vulparam[] = new Array();
  id: string | null;
  idendpoint: string | null;

  constructor(private vulnerabilities: VulnerabilitiesService, public route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.idendpoint = this.route.snapshot.paramMap.get('idendpoint');
  }

  ngOnInit(): void {
    this.vulnerabilities.getVulnerabilitiesProject(this.id!, this.idendpoint!).subscribe(res => {
      this.Vulparam = res;
      console.log(this.Vulparam);
    })
  }
}