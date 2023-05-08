import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyResetPasswordComponent } from './faculty-reset-password.component';

describe('FacultyResetPasswordComponent', () => {
  let component: FacultyResetPasswordComponent;
  let fixture: ComponentFixture<FacultyResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyResetPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
