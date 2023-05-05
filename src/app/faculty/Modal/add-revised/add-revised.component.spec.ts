import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRevisedComponent } from './add-revised.component';

describe('AddRevisedComponent', () => {
  let component: AddRevisedComponent;
  let fixture: ComponentFixture<AddRevisedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRevisedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRevisedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
