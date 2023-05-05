import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyCapsuleComponent } from './view-my-capsule.component';

describe('ViewMyCapsuleComponent', () => {
  let component: ViewMyCapsuleComponent;
  let fixture: ComponentFixture<ViewMyCapsuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMyCapsuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMyCapsuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
