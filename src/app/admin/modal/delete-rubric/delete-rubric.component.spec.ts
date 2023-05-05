import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRubricComponent } from './delete-rubric.component';

describe('DeleteRubricComponent', () => {
  let component: DeleteRubricComponent;
  let fixture: ComponentFixture<DeleteRubricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRubricComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteRubricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
