import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import pptxgen from 'pptxgenjs';
import { RequirementService } from 'src/app/services/requirement.service';

@Directive({
  selector: '[appGeneratePpt]',
})
export class GeneratePptDirective implements OnInit {
  //initialize pptxgenjs library
  pptx = new pptxgen();
  selectedFile: any = null;
  RequirementData!: any;

  constructor(private el: ElementRef, private formData: RequirementService) {}

  @HostListener('click') generate() {
    this.onGenerate();
  }

  ngOnInit(): void {
    this.getRequirementData();
  }

  getRequirementData() {
    this.formData.formDataSubject.subscribe((data) => {
      this.RequirementData = data;
      console.log(this.RequirementData);
    });
  }

  onGenerate() {
    // add slide inside the ppt

    this.genSlide01(this.pptx);
    this.genSlide02(this.pptx);
  }

  genSlide01(pptx: any) {
    let slideHeading = 'This is first hello world slide';
    let options = {
      x: 0.0,
      y: 0.0,
      w: '100%',
      h: 1.5, // add height to text
      align: 'center',
      fontSize: 24,
      color: 'f00000',
      fill: '000000',
    };
    let slide = pptx.addSlide();
    slide.addText(slideHeading, options);
    //Save the Presentation file name
  }
  genSlide02(pptx: any) {
    let slideHeading = 'This is Second slide';
    let slideImage =
      'https://cdn.pixabay.com/photo/2014/05/26/13/32/butterfly-354528_1280.jpg';
    let options = {
      x: 0.0,
      y: 0.0,
      w: '100%',
      h: 1.5, // add height to text
      align: 'center',
      fontSize: 24,
      color: 'f00000',
      fill: '000000',
    };
    let slide = pptx.addSlide();
    slide.addText(slideHeading, options);
    slide.addImage({
      path: slideImage,
      x: '15%',
      y: '30%',
      w: '65%',
      h: '65%',
    });
    this.pptx.writeFile({ fileName: 'Sample Presentation.pptx' });
  }
}
