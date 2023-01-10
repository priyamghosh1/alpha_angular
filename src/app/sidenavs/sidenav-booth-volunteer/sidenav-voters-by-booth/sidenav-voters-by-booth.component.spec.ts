import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavVotersByBoothComponent } from './sidenav-voters-by-booth.component';

describe('SidenavVotersByBoothComponent', () => {
  let component: SidenavVotersByBoothComponent;
  let fixture: ComponentFixture<SidenavVotersByBoothComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavVotersByBoothComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavVotersByBoothComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
