import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeConfirmComponent } from './theme-confirm.component';

describe('ThemeConfirmComponent', () => {
  let component: ThemeConfirmComponent;
  let fixture: ComponentFixture<ThemeConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemeConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
