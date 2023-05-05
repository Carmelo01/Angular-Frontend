import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveReviewerComponent } from './remove-reviewer.component';

describe('RemoveReviewerComponent', () => {
  let component: RemoveReviewerComponent;
  let fixture: ComponentFixture<RemoveReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveReviewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
