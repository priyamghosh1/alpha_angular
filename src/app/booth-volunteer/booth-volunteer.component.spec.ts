import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoothVolunteerComponent } from './booth-volunteer.component';

describe('BoothVolunteerComponent', () => {
  let component: BoothVolunteerComponent;
  let fixture: ComponentFixture<BoothVolunteerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoothVolunteerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoothVolunteerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
