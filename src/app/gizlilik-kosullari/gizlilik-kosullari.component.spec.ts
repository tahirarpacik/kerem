import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GizlilikKosullariComponent } from './gizlilik-kosullari.component';

describe('GizlilikKosullariComponent', () => {
  let component: GizlilikKosullariComponent;
  let fixture: ComponentFixture<GizlilikKosullariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GizlilikKosullariComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GizlilikKosullariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
