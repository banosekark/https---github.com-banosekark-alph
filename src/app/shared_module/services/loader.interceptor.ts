import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType,
} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { PptProjectService } from 'src/app/services/ppt-project.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private pptProjectService: PptProjectService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    return next.handle(request).pipe(
      tap((event) => {
        this.pptProjectService.loader.next(true);
        if (event.type == HttpEventType.Response) {
          //When response is 200
          if (event.status == 200) {
            //loader is false
            this.pptProjectService.loader.next(false);
          }
        }
      })
    );
  }
}
