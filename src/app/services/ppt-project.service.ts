import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { config } from '../config';

@Injectable({
  providedIn: 'root',
})
export class PptProjectService {
  baseURL: string = config.API_URL;
  loader = new BehaviorSubject<Boolean>(false);
  error: any;

  constructor(private http: HttpClient) {}

  //GET All Project
  getAllProjects() {
    return this.http.get(`${this.baseURL}/api/PptProjects`);
  }

  //GET Project By Id

  getProjectById(id: any) {
    return this.http.get(`${this.baseURL}/api/PptProjects/${id}`);
  }

  // POST
  addProject(project: any) {
    // const headers = { 'content-type': 'application/json' };
    // const body = JSON.stringify(project);
    return this.http.post(this.baseURL + '/api/PptProjects', project);
  }

  //Update
  updateProject(project: any, id: any) {
    return this.http.put(this.baseURL + '/api/PptProjects', project);
  }

  //DELETE
  deleteProject(id: any) {
    return this.http.delete(`${this.baseURL}/api/PptProjects/${id}`);
  }
}
