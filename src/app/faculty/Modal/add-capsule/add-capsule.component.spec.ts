import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCapsuleComponent } from './add-capsule.component';

describe('AddCapsuleComponent', () => {
  let component: AddCapsuleComponent;
  let fixture: ComponentFixture<AddCapsuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCapsuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCapsuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
