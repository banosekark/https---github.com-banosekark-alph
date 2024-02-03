import { Component } from '@angular/core';
import { PptProjectService } from 'src/app/services/ppt-project.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  loader!: Boolean;

  constructor(private pptProjectService: PptProjectService) {
    this.pptProjectService.loader.subscribe((res) => {
      this.loader = res;
    });
  }
}
