import { Component } from '@angular/core';
import { ErrorService } from '../services/error.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  error: any;
  errMsg = this.errorService.errorsMsg;

  constructor(private errorService: ErrorService) {}
}
