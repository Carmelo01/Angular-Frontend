import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyFacultyComponent } from './verify-faculty.component';

describe('VerifyFacultyComponent', () => {
  let component: VerifyFacultyComponent;
  let fixture: ComponentFixture<VerifyFacultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyFacultyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
