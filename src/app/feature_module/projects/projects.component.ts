import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PptProjectService } from 'src/app/services/ppt-project.service';
import {
  faArrowLeft,
  faEye,
  faPencil,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { Route, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  public dataSource!: MatTableDataSource<any>;
  public projects: any;
  eyeIcon = faEye;
  pencilIcon = faPencil;
  deleteIcon = faTrashCan;
  backIcon = faArrowLeft;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public displayedColumns: string[] = [
    'id',
    'projectName',
    'email',
    'city',
    'contactNumber',
    'width',
    'height',
    'type',
    'image',
    'action',
  ];

  constructor(
    private pptProjectService: PptProjectService,
    private router: Router,
    private tostService: NgToastService
  ) {}
  ngOnInit(): void {
    this.getProjects();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getProjects() {
    this.pptProjectService.getAllProjects().subscribe((res) => {
      this.projects = res;
      console.log(this.projects);
      this.dataSource = new MatTableDataSource(this.projects);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Edit Project
  onProjectEdit(id: number) {
    this.router.navigate(['update', id]);
  }

  //Delete Project
  // Delete Project
  onDeleteProject(id: any) {
    this.pptProjectService.deleteProject(id).subscribe((res) => {
      this.tostService.success({
        detail: 'SUCCESS',
        summary: 'Delete Successfully',
        duration: 5000,
      });
      this.getProjects();
    });
  }
}
