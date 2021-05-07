import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioModalComponent } from './bio-modal.component';

describe('BioModalComponent', () => {
  let component: BioModalComponent;
  let fixture: ComponentFixture<BioModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BioModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
