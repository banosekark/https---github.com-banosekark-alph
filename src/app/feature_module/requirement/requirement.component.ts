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
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { PptProjectService } from 'src/app/services/ppt-project.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute } from '@angular/router';

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
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  @ViewChild('fileInput') fileInput!: ElementRef;
  fileAttr = 'Choose File';
  heading: any;
  pptWidth: any;
  pptHeight: any;
  pptType: any;
  city: any;
  projName: any;
  emailId: any;
  contactNumber: any;
  projectIdToUpdate!: number;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private ProjectService: PptProjectService,
    private tostService: NgToastService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.pageForm();
    this.activatedRoute.params.subscribe((value) => {
      console.log('value', value);
      this.projectIdToUpdate = value['id'];
      this.ProjectService.getProjectById(this.projectIdToUpdate).subscribe(
        (res) => {
          console.log(res);
        }
      );
    });
  }

  // requirement form
  pageForm() {
    this.requirementForm = this.fb.group({
      projectName: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      city: new FormControl('', [Validators.required]),
      contactNumber: new FormControl('', [
        Validators.required,
        Validators.min(10),
      ]),
      slide: this.fb.array([this.newSlide()]),
    });
  }

  // getting slide form array control
  get slide(): FormArray {
    return this.requirementForm.controls['slide'] as FormArray;
  }

  // form array controls
  newSlide(): FormGroup {
    return this.fb.group({
      heading: new FormControl(''),
      width: new FormControl('', [Validators.required]),
      height: new FormControl('', [Validators.required]),
      selectType: new FormControl('Select Type', [Validators.required]),
      image: new FormControl(this.url, [Validators.required]),
    });
  }

  // adding form array controls to slide
  onAddSlide() {
    this.slide.push(this.newSlide());
  }

  onFillFormToUpdate(project: any) {
    this.requirementForm.setValue({
      projectName: project.projectName,
      email: project.email,
      contactNumber: project.contactNumber,
      city: project.city,
      heading: project.heading,
      type: project.selectType,
      width: project.width,
      height: project.height,
      image: project.image,
    });
  }

  onDeleteRequirement() {}

  //SUBMIT form
  onRequirementSubmitted() {
    this.formData = this.requirementForm.value;
    console.log(this.formData);
    this.url = this.formData.slide[0].uploadFile;
    this.heading = this.formData.slide[0].heading;
    //this.openDialog('1000ms', '1500ms');
    this.AddProject();
  }

  // POST project data to API
  AddProject() {
    let payload;
    let project = [
      {
        projectName: this.formData.projectName,
        email: this.formData.email,
        contactNumber: this.formData.contactNumber,
        city: this.formData.city,
        heading: this.formData.slide[0].heading,
        type: this.formData.slide[0].selectType,
        width: +this.formData.slide[0].width,
        height: +this.formData.slide[0].height,
        image: this.formData.slide[0].image,
      },
    ];

    project.forEach((e) => {
      payload = e;
    });
    this.ProjectService.addProject(payload).subscribe((res) => {
      //Adding Tost message
      this.tostService.success({
        detail: 'Success',
        summary: 'Enquiry Added',
        duration: 5000,
      });
      //Reset Form
      //this.requirementForm.reset();
    });
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

  onAddProjectName(e: any) {
    this.projName = e.target.value;
  }

  onAddEmail(e: any) {
    this.emailId = e.target.value;
  }
  onAddPhone(e: any) {
    this.contactNumber = e.target.value;
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

  remove(a: any) {}
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
  }
}
