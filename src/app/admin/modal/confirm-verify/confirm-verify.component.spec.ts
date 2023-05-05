import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmVerifyComponent } from './confirm-verify.component';

describe('ConfirmVerifyComponent', () => {
  let component: ConfirmVerifyComponent;
  let fixture: ComponentFixture<ConfirmVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmVerifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
