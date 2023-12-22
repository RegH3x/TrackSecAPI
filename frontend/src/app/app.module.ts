import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectComponent } from './project/project.component';
import { ProjectsComponent } from './projects/projects.component';
import { AddprojectComponent } from './addproject/addproject.component';
import { EndpointComponent } from './endpoint/endpoint.component';
import { EndpointsComponent } from './endpoints/endpoints.component';
import { EditprojectComponent } from './editproject/editproject.component';
import { VulnerabilityComponent } from './vulnerability/vulnerability.component';
import { VulnerabilitiesComponent } from './vulnerabilities/vulnerabilities.component';
import { ParameterComponent } from './parameter/parameter.component';
import { ParametersComponent } from './parameters/parameters.component';
import { EditendpointComponent } from './editendpoint/editendpoint.component';
import { EditparameterComponent } from './editparameter/editparameter.component';
import { EditvulnerabilityComponent } from './editvulnerability/editvulnerability.component';
import { EndpointcorrComponent } from './endpointcorr/endpointcorr.component';
import { VulnparamComponent } from './vulnparam/vulnparam.component';
import { EndparamComponent } from './endparam/endparam.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    ProjectComponent,
    ProjectsComponent,
    AddprojectComponent,
    EndpointComponent,
    EndpointsComponent,
    EditprojectComponent,
    VulnerabilityComponent,
    VulnerabilitiesComponent,
    ParameterComponent,
    ParametersComponent,
    EditendpointComponent,
    EditparameterComponent,
    EditvulnerabilityComponent,
    EndpointcorrComponent,
    VulnparamComponent,
    EndparamComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
