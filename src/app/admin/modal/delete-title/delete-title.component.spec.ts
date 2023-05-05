import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTitleComponent } from './delete-title.component';

describe('DeleteTitleComponent', () => {
  let component: DeleteTitleComponent;
  let fixture: ComponentFixture<DeleteTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
