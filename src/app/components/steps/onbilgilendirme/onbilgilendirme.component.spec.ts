import { ComponentFixture, TestBed } from "@angular/core/testing";

import { OnBilgilendirmeComponent } from "./onbilgilendirme.component";

describe("OnbilgilendirmeComponent", () => {
  let component: OnBilgilendirmeComponent;
  let fixture: ComponentFixture<OnBilgilendirmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnBilgilendirmeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnBilgilendirmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
