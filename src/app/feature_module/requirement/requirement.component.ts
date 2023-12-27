import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-requirement',
  templateUrl: './requirement.component.html',
  styleUrls: ['./requirement.component.scss'],
})
export class RequirementComponent implements OnInit {
  requirementForm!: FormGroup;
  selectedFile: any = null;

  ngOnInit(): void {
    this.pageForm();
  }

  pageForm() {
    this.requirementForm = new FormGroup({
      fullName: new FormControl(''),
      email: new FormControl(''),
      phoneNumber: new FormControl(''),
      subject: new FormControl(''),
      companyName: new FormControl(''),
      width: new FormControl(''),
      height: new FormControl(''),
      comments: new FormControl(''),
      selectType: new FormControl(''),
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }
}
