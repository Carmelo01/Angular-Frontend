import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyCapsuleComponent } from './my-capsule.component';

describe('MyCapsuleComponent', () => {
  let component: MyCapsuleComponent;
  let fixture: ComponentFixture<MyCapsuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCapsuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCapsuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct title', () => {
    const expectedTitle = 'My Capsule';
    const titleElement = fixture.nativeElement.querySelector('h1');
    expect(titleElement.textContent).toContain(expectedTitle);
  });

  // Add more test cases as needed
});
