import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RequirementService } from 'src/app/services/requirement.service';
import { GeneratePptComponent } from './generate-ppt/generate-ppt.component';

@Component({
  selector: 'app-requirement',
  templateUrl: './requirement.component.html',
  styleUrls: ['./requirement.component.scss'],
})
export class RequirementComponent implements OnInit {
  requirementForm!: FormGroup;
  selectedFile: any = null;
  projectName: string = '';
  formData: any = {};

  constructor(private fb: FormBuilder, public dialog: MatDialog) {}

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
    });
  }

  // getting projects form array control
  get projects(): FormArray {
    return this.requirementForm.controls['projects'] as FormArray;
  }

  // form array controls
  newRequirement(): FormGroup {
    return this.fb.group({
      subject: new FormControl(''),
      companyName: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      width: new FormControl('', [Validators.required]),
      height: new FormControl('', [Validators.required]),
      comments: new FormControl(''),
      selectType: new FormControl('Select Type', [Validators.required]),
      upload: new FormControl('', [Validators.required]),
    });
  }

  // adding form array controls to projects
  onAddRequirement() {
    this.projects.push(this.newRequirement());
  }

  onDeleteRequirement() {}

  onRequirementSubmitted() {
    this.formData = this.requirementForm.value;
    this.openDialog('1000ms', '1500ms');
  }

  // Dialog Box
  //Open dialog box
  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(GeneratePptComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: this.formData,
    });
  }
}
