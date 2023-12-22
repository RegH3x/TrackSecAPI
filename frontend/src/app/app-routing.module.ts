import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddprojectComponent } from './addproject/addproject.component';
import { BodyComponent } from './body/body.component';
import { EditendpointComponent } from './editendpoint/editendpoint.component';
import { EditparameterComponent } from './editparameter/editparameter.component';
import { EditprojectComponent } from './editproject/editproject.component';
import { EditvulnerabilityComponent } from './editvulnerability/editvulnerability.component';
import { EndparamComponent } from './endparam/endparam.component';
import { EndpointComponent } from './endpoint/endpoint.component';
import { EndpointcorrComponent } from './endpointcorr/endpointcorr.component';
import { EndpointsComponent } from './endpoints/endpoints.component';
import { ParameterComponent } from './parameter/parameter.component';
import { ParametersComponent } from './parameters/parameters.component';
import { ProjectComponent } from './project/project.component';
import { ProjectsComponent } from './projects/projects.component';
import { SearchComponent } from './search/search.component';
import { VulnerabilitiesComponent } from './vulnerabilities/vulnerabilities.component';
import { VulnerabilityComponent } from './vulnerability/vulnerability.component';
import { VulnparamComponent } from './vulnparam/vulnparam.component';

const routes: Routes = [
  { path: '', component: BodyComponent },
  { path: 'addproject', component: AddprojectComponent},
  { path: 'projects', component: ProjectsComponent},
  { path: 'projects/:id', component: ProjectComponent},
  { path: 'projects/:id/editproject', component: EditprojectComponent},
  { path: 'projects/:id/endparam', component: EndparamComponent},
  { path: 'projects/:id/search', component: SearchComponent},
  { path: 'projects/:id/endpoints', component: EndpointsComponent}, 
  { path: 'projects/:id/endpoints/:idendpoint', component: EndpointComponent},
  { path: 'projects/:id/endpoints/:idendpoint/editendpoint', component: EditendpointComponent},
  { path: 'projects/:id/endpoints/:idendpoint/endpointcorr', component: EndpointcorrComponent},
  { path: 'projects/:id/endpoints/:idendpoint/vulnparam', component: VulnparamComponent}, 
  { path: 'projects/:id/endpoints/:idendpoint/parameters', component: ParametersComponent}, 
  { path: 'projects/:id/endpoints/:idendpoint/parameters/:idparameter', component: ParameterComponent}, 
  { path: 'projects/:id/endpoints/:idendpoint/parameters/:idparameter/editparameter', component: EditparameterComponent},     
  { path: 'projects/:id/endpoints/:idendpoint/vulnerabilities', component: VulnerabilitiesComponent}, 
  { path: 'projects/:id/endpoints/:idendpoint/vulnerabilities/:idvulnerability', component: VulnerabilityComponent}, 
  { path: 'projects/:id/endpoints/:idendpoint/vulnerabilities/:idvulnerability/editvulnerability', component: EditvulnerabilityComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
