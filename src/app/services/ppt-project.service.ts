import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PptProjectService {
  baseURL: string = 'https://localhost:7234';
  constructor(private http: HttpClient) {}

  // Post

  addProject(project: any) {
    const headers = { 'content-type': 'application/json' };
    // const body = JSON.stringify(project);
    return this.http.post(this.baseURL + '/api/PptProjects', project);
  }
}
