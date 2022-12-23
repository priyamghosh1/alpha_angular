import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendVolunteerComponent } from './legend-volunteer.component';

describe('LegendVolunteerComponent', () => {
  let component: LegendVolunteerComponent;
  let fixture: ComponentFixture<LegendVolunteerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegendVolunteerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegendVolunteerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
