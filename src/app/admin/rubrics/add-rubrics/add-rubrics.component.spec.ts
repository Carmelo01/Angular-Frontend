import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRubricsComponent } from './add-rubrics.component';

describe('AddRubricsComponent', () => {
  let component: AddRubricsComponent;
  let fixture: ComponentFixture<AddRubricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRubricsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRubricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
