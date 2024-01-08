import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-generate-ppt',
  templateUrl: './generate-ppt.component.html',
  styleUrls: ['./generate-ppt.component.scss'],
})
export class GeneratePptComponent implements OnInit {
  requirementData = new Subscription();
  project: any = [];
  @Input() FormData: any;
  constructor(@Inject(MAT_DIALOG_DATA) public formData: any) {}

  ngOnInit(): void {
    console.log(this.formData);
  }
}
