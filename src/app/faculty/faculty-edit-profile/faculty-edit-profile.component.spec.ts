import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyEditProfileComponent } from './faculty-edit-profile.component';

describe('FacultyEditProfileComponent', () => {
  let component: FacultyEditProfileComponent;
  let fixture: ComponentFixture<FacultyEditProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyEditProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
