import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GeneratePptDirective } from './shared_module/directives/generate-ppt.directive';

import { FooterComponent } from './core_module/components/footer/footer.component';
import { HeaderComponent } from './core_module/components/header/header.component';
import { HomeComponent } from './core_module/components/home/home.component';
import { NavigationComponent } from './core_module/components/navigation/navigation.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RequirementComponent } from './feature_module/requirement/requirement.component';
import { ChipsComponent } from './shared_module/components/chips/chips.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadFormComponent } from './shared_module/components/upload-form/upload-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { GeneratePptComponent } from './feature_module/requirement/generate-ppt/generate-ppt.component';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { ProjectsComponent } from './feature_module/projects/projects.component';
import { NgToastModule } from 'ng-angular-popup';
import { LoaderComponent } from './shared_module/loader/loader.component';
import { LoaderInterceptor } from './shared_module/services/loader.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NavigationComponent,
    RequirementComponent,
    ChipsComponent,
    UploadFormComponent,
    GeneratePptDirective,
    GeneratePptComponent,
    ProjectsComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatToolbarModule,
    MatDividerModule,
    MatDialogModule,
    MatListModule,
    NgToastModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
