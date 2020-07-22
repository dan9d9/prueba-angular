import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMoreBtnComponent } from './view-more-btn.component';

describe('ViewMoreBtnComponent', () => {
  let component: ViewMoreBtnComponent;
  let fixture: ComponentFixture<ViewMoreBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMoreBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMoreBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
