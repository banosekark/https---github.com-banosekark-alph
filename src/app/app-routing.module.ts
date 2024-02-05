import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequirementComponent } from './feature_module/requirement/requirement.component';
import { HomeComponent } from './core_module/components/home/home.component';
import { ProjectsComponent } from './feature_module/projects/projects.component';
import { ProjectDetailComponent } from './feature_module/projects/project-detail/project-detail.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'requirement' },
  { path: 'home', component: HomeComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'detail/:id', component: ProjectDetailComponent },
  { path: 'update/:id', component: RequirementComponent },
  { path: 'requirement', component: RequirementComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
