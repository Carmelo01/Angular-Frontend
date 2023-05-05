import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSidenavComponent } from './edit-sidenav.component';

describe('EditSidenavComponent', () => {
  let component: EditSidenavComponent;
  let fixture: ComponentFixture<EditSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSidenavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
