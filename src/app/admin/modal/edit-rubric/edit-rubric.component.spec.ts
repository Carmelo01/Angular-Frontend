import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRubricComponent } from './edit-rubric.component';

describe('EditRubricComponent', () => {
  let component: EditRubricComponent;
  let fixture: ComponentFixture<EditRubricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRubricComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRubricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
