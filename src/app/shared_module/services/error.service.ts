import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor() {}

  errorsMsg = {
    UNKNOWN: 'An Unknown Error is Occurred',
    EMAIL_EXISTS: 'This Email is Already Exist. Please try with another email',
    OPERATION_NOT_ALLOWED: 'Password sign-in is disabled for this project.',
    TOO_MANY_ATTEMPTS_TRY_LATER:
      'We have blocked all requests from this device',
  };
}
