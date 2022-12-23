import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictAdminPanelComponent } from './district-admin-panel.component';

describe('DistrictAdminPanelComponent', () => {
  let component: DistrictAdminPanelComponent;
  let fixture: ComponentFixture<DistrictAdminPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictAdminPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictAdminPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
