import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequirementService {
  public formDataSubject = new Subject();

  constructor() {}

  sendFormData(data: any) {
    this.formDataSubject.next(data);
  }
}
