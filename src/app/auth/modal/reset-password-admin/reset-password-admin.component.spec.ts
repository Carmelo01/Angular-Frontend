import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordAdminComponent } from './reset-password-admin.component';

describe('ResetPasswordAdminComponent', () => {
  let component: ResetPasswordAdminComponent;
  let fixture: ComponentFixture<ResetPasswordAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
