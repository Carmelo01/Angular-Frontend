import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclineFacultyComponent } from './decline-faculty.component';

describe('DeclineFacultyComponent', () => {
  let component: DeclineFacultyComponent;
  let fixture: ComponentFixture<DeclineFacultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclineFacultyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeclineFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
