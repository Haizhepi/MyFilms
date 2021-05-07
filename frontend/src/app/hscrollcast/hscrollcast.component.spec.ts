import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HscrollcastComponent } from './hscrollcast.component';

describe('HscrollcastComponent', () => {
  let component: HscrollcastComponent;
  let fixture: ComponentFixture<HscrollcastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HscrollcastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HscrollcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
