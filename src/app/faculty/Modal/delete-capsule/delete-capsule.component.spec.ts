import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCapsuleComponent } from './delete-capsule.component';

describe('DeleteCapsuleComponent', () => {
  let component: DeleteCapsuleComponent;
  let fixture: ComponentFixture<DeleteCapsuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCapsuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCapsuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
