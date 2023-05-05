import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadRevisionComponent } from './upload-revision.component';

describe('UploadRevisionComponent', () => {
  let component: UploadRevisionComponent;
  let fixture: ComponentFixture<UploadRevisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadRevisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
