import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordFacultyComponent } from './forgot-password-faculty.component';

describe('ForgotPasswordFacultyComponent', () => {
  let component: ForgotPasswordFacultyComponent;
  let fixture: ComponentFixture<ForgotPasswordFacultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordFacultyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
