import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  url: any; //Angular 11, for stricter type
  msg = '';

  @ViewChild('fileInput') fileInput!: ElementRef;
  fileAttr = 'Choose File';
  heading: any;
  pptWidth: any;
  pptHeight: any;
  pptType: any;
  city: any;
  fullName: any;
  emailId: any;
  phoneNumber: any;

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
      slide: this.fb.array([this.newRequirement()]),
    });
  }

  // getting slide form array control
  get slide(): FormArray {
    return this.requirementForm.controls['slide'] as FormArray;
  }

  // form array controls
  newRequirement(): FormGroup {
    return this.fb.group({
      heading: new FormControl(''),
      companyName: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      width: new FormControl('', [Validators.required]),
      height: new FormControl('', [Validators.required]),
      comments: new FormControl(''),
      selectType: new FormControl('Select Type', [Validators.required]),
      uploadFile: new FormControl('', [Validators.required]),
    });
  }

  // adding form array controls to slide
  onAddRequirement() {
    this.slide.push(this.newRequirement());
  }

  onDeleteRequirement() {}

  onRequirementSubmitted() {
    this.formData = this.requirementForm.value;
    this.url = this.formData.slide[0].uploadFile;
    this.heading = this.formData.slide[0].heading;
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

  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: any) => {
        this.fileAttr += file.name + ' - ';
      });
      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          let imgBase64Path = e.target.result;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = '';
    } else {
      this.fileAttr = 'Choose File';
    }
  }

  selectFile(event: any) {
    //Angular 11, for stricter type
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Only images are supported';
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msg = '';
      this.url = reader.result;
    };
  }

  readUrl(event: any) {
    this.selectedFile = event.target.files[0] ?? null;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onAddFullName(e: any) {
    this.fullName = e.target.value;
  }
  onAddEmail(e: any) {
    this.emailId = e.target.value;
  }
  onAddPhone(e: any) {
    this.phoneNumber = e.target.value;
  }
  onAddHeading(e: any) {
    this.heading = e.target.value;
  }
  onAddingCity(e: any) {
    this.city = e.target.value;
  }

  onAddingWidth(e: any) {
    this.pptWidth = e.target.value;
  }
  onAddingHeight(e: any) {
    this.pptHeight = e.target.value;
  }
  onTypeChange(e: any) {
    this.pptType = e;
  }
}
