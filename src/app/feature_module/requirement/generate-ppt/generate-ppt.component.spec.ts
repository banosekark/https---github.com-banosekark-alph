import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePptComponent } from './generate-ppt.component';

describe('GeneratePptComponent', () => {
  let component: GeneratePptComponent;
  let fixture: ComponentFixture<GeneratePptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneratePptComponent]
    });
    fixture = TestBed.createComponent(GeneratePptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
