import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuenosComponent } from './duenos.component';

describe('DuenosComponent', () => {
  let component: DuenosComponent;
  let fixture: ComponentFixture<DuenosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuenosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuenosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
