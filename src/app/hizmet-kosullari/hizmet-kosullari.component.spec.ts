import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HizmetKosullariComponent } from './hizmet-kosullari.component';

describe('HizmetKosullariComponent', () => {
  let component: HizmetKosullariComponent;
  let fixture: ComponentFixture<HizmetKosullariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HizmetKosullariComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HizmetKosullariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
