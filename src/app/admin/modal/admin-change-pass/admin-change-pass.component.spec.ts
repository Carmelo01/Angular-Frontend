import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChangePassComponent } from './admin-change-pass.component';

describe('AdminChangePassComponent', () => {
  let component: AdminChangePassComponent;
  let fixture: ComponentFixture<AdminChangePassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminChangePassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminChangePassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
