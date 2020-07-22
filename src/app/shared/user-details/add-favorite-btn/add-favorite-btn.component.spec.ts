import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFavoriteBtnComponent } from './add-favorite-btn.component';

describe('AddFavoriteBtnComponent', () => {
  let component: AddFavoriteBtnComponent;
  let fixture: ComponentFixture<AddFavoriteBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFavoriteBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFavoriteBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
