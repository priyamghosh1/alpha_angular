import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollingNumberComponent } from './polling-number.component';

describe('PollingNumberComponent', () => {
  let component: PollingNumberComponent;
  let fixture: ComponentFixture<PollingNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollingNumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PollingNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
