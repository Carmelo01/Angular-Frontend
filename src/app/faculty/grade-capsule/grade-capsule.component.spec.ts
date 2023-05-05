import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeCapsuleComponent } from './grade-capsule.component';

describe('GradeCapsuleComponent', () => {
  let component: GradeCapsuleComponent;
  let fixture: ComponentFixture<GradeCapsuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradeCapsuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradeCapsuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
