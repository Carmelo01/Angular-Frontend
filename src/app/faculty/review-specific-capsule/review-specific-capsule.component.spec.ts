import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSpecificCapsuleComponent } from './review-specific-capsule.component';

describe('ReviewSpecificCapsuleComponent', () => {
  let component: ReviewSpecificCapsuleComponent;
  let fixture: ComponentFixture<ReviewSpecificCapsuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewSpecificCapsuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewSpecificCapsuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
