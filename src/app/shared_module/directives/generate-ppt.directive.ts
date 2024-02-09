import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
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

  @Input() pptName: any;

  constructor(private el: ElementRef) {}

  @HostListener('click') generate() {
    this.genSlide01(this.pptx);
    this.genSlide02(this.pptx);
    this.genSlide03(this.pptx);
    this.genSlide04(this.pptx);
    this.genSlideEnd(this.pptx);
  }

  ngOnInit(): void {}

  genMasterSlide(pptx: any) {
    pptx.layout = 'LAYOUT_WIDE';

    pptx.defineSlideMaster({
      title: 'MASTER_SLIDE',
      margin: [0.5, 0.25, 1.0, 0.25],
      background: { color: 'FFFFFF' },
      objects: [
        {
          // slide bottom rect angle
          rect: { x: 0, y: 7.1, w: '100%', h: 0.5, fill: { color: '003b75' } },
        },
        {
          // slide bottom rect angle text
          text: {
            text: 'S.T.A.R. Laboratories - Confidential',
            options: {
              x: 0,
              y: 7.4,
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
            y: 7.2,
            w: 1.67,
            h: 0.3,
            path: 'https://cdn.pixabay.com/photo/2014/05/26/13/32/butterfly-354528_1280.jpg',
          },
        },
      ],
      slideNumber: { x: 0.5, y: 7.2, color: 'FFFFFF' }, // Slide Number
    });
  }
  genSlide01(pptx: any) {
    this.genMasterSlide(this.pptx);
    let slide = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
    slide.addText(this.pptName.projectName, {
      x: 0,
      y: '45%',
      w: '100%',
      fontSize: 34,
      color: '003b75',
      bold: true,
      align: 'center',
      valign: 'middle',
      shadow: { type: 'outer', opacity: 0.3 },
    });
    slide.addText(this.pptName.city, {
      x: 0,
      y: '60%',
      w: '100%',
      fontSize: 28,
      color: '003b75',
      bold: true,
      align: 'center',
      valign: 'middle',
    });
  }

  genSlide02(pptx: any) {
    let slideHeading =
      this.pptName.projectName +
      ' ' +
      this.pptName.slide[0].width +
      ' x ' +
      this.pptName.slide[0].height +
      ' ' +
      this.pptName.slide[0].selectType; //'Sr 15 Janta Hardware  96x36”  GSB'
    // let type = 'Vinyl+Sunboard';
    let slideImage =
      'https://cdn.pixabay.com/photo/2014/05/26/13/32/butterfly-354528_1280.jpg';

    let slide = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
    slide.addText(slideHeading, {
      x: 0.0,
      y: 0.1,
      w: '100%',
      h: 0.8, // add height to text
      align: 'center',
      fontSize: 30,
      bold: true,
      color: '003b75',
    });
    slide.addText(this.pptName.slide[0].selectType, {
      x: 0.0,
      y: 0.8,
      w: '100%',
      h: 0.8, // add height to text
      align: 'center',
      fontSize: 27,
      color: '003b75',
    });
    slide.addImage({
      path: slideImage,
      x: '15%',
      y: '22%',
      sizing: {
        type: 'contain',
        w: '70%',
        h: '70%',
      },
    });
    //Save the Presentation file name
  }
  genSlide03(pptx: any) {
    let slideHeading =
      this.pptName.projectName +
      '' +
      this.pptName.slide[0].width +
      'x' +
      this.pptName.slide[0].height +
      this.pptName.slide[0].selectType;
    let slideImage = this.pptName.slide[0].image;
    // let slideImage =
    //   'https://cdn.pixabay.com/photo/2014/05/26/13/32/butterfly-354528_1280.jpg';

    let slide = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
    slide.addImage({
      path: slideImage,
      x: 0.0,
      y: 0.2,
      sizing: {
        type: 'contain',
        w: '90%',
        h: '90%',
      },
    });
  }

  genSlide04(pptx: any) {
    let slideHeading =
      this.pptName.projectName +
      '' +
      this.pptName.slide[0].width +
      'x' +
      this.pptName.slide[0].height +
      this.pptName.slide[0].selectType;
    let type = 'Vinyl+Sunboard';
    let slideImage =
      'https://cdn.pixabay.com/photo/2014/05/26/13/32/butterfly-354528_1280.jpg';

    let slide = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
    slide.addText(slideHeading, {
      x: 0.0,
      y: 0.1,
      w: '100%',
      h: 0.8, // add height to text
      align: 'center',
      fontSize: 30,
      bold: true,
      color: '003b75',
    });
    slide.addText(this.pptName.slide[0].selectType, {
      x: 0.0,
      y: 0.8,
      w: '100%',
      h: 0.8, // add height to text
      align: 'center',
      fontSize: 27,
      color: '003b75',
    });
    slide.addImage({
      path: slideImage,
      x: '15%',
      y: '22%',
      sizing: {
        type: 'contain',
        w: '70%',
        h: '70%',
      },
    });
    //Save the Presentation file name
  }

  // End slide
  genSlideEnd(pptx: any) {
    pptx.defineSlideMaster({
      title: 'END_SLIDE',
      margin: [0.5, 0.25, 1.0, 0.25],
      background: { color: '003b75' }, //add background color to slide
    });
    let slide = pptx.addSlide({ masterName: 'END_SLIDE' });
    slide.addText('Thank You !', {
      x: 0,
      y: '50%',
      w: '100%',
      fontSize: 50,
      color: 'FFFFFF',
      bold: true,
      align: 'center',
      valign: 'middle',
      shadow: { type: 'outer', opacity: 0.3 },
    });

    this.pptx.writeFile({ fileName: 'Sample Presentation.pptx' });
  }
}
