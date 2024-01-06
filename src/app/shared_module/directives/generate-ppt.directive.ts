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
    this.genSlide03(this.pptx);
  }

  genSlide01(pptx: any) {
    pptx.layout = 'LAYOUT_WIDE';

    pptx.defineSlideMaster({
      title: 'MASTER_SLIDE',
      margin: [0.5, 0.25, 1.0, 0.25],
      background: { color: 'FFFFFF' },
      objects: [
        {
          // slide bottom rect angle
          rect: { x: 0, y: 6.9, w: '100%', h: 0.7, fill: { color: '003b75' } },
        },
        {
          // slide bottom rect angle text
          text: {
            text: 'S.T.A.R. Laboratories - Confidential',
            options: {
              x: 0,
              y: 7.3,
              w: '100%',
              align: 'center',
              color: 'FFFFFF',
              fontSize: 12,
            },
          },
        },
        {
          // slide bottom rect angle image
          image: {
            x: 11.45,
            y: 7,
            w: 1.67,
            h: 0.5,
            path: 'https://cdn.pixabay.com/photo/2014/05/26/13/32/butterfly-354528_1280.jpg',
          },
        },
      ],
      slideNumber: { x: 1.0, y: 7.1, color: 'FFFFFF' }, // Slide Number
    });

    let slide = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
    slide.addText('How To Create PowerPoint Presentations with JavaScript', {
      x: 0,
      y: '50%',
      w: '100%',
      fontSize: 34,
      color: '003b75',
      bold: true,
      align: 'center',
      valign: 'middle',
      shadow: { type: 'outer', opacity: 0.3 },
    });
  }
  genSlide02(pptx: any) {
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
  genSlide03(pptx: any) {
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
