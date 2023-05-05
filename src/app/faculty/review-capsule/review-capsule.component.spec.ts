import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewCapsuleComponent } from './review-capsule.component';

describe('ReviewCapsuleComponent', () => {
  let component: ReviewCapsuleComponent;
  let fixture: ComponentFixture<ReviewCapsuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewCapsuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewCapsuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
