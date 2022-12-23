import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssemblyConstituencyComponent } from './assembly-constituency.component';

describe('AssemblyConstituencyComponent', () => {
  let component: AssemblyConstituencyComponent;
  let fixture: ComponentFixture<AssemblyConstituencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssemblyConstituencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssemblyConstituencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
