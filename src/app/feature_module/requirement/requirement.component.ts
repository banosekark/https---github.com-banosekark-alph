import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-requirement',
  templateUrl: './requirement.component.html',
  styleUrls: ['./requirement.component.scss'],
})
export class RequirementComponent implements OnInit {
  requirementForm!: FormGroup;
  selectedFile: any = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.pageForm();
  }

  // requirement form
  pageForm() {
    this.requirementForm = this.fb.group({
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.min(10),
      ]),
      projects: this.fb.array([this.newRequirement()]),
      projectRequirement: this.fb.group({
        subject: new FormControl(''),
        companyName: new FormControl('', [Validators.required]),
        width: new FormControl('', [Validators.required]),
        height: new FormControl('', [Validators.required]),
        comments: new FormControl(''),
        selectType: new FormControl('', [Validators.required]),
      }),
    });
  }

  // getting projects form array control
  get projects(): FormArray {
    return this.requirementForm.controls['projects'] as FormArray;
  }

  // form array controls
  newRequirement(): FormGroup {
    return this.fb.group({
      subject: '',
      companyName: '',
      width: '',
      height: '',
      comments: '',
      selectType: '',
    });
  }

  // adding form array controls to projects
  onAddRequirement() {
    this.projects.push(this.newRequirement());
  }

  onRequirementSubmitted() {
    console.log(this.requirementForm);
  }
}
