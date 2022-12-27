import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavcompComponent } from './navcomp.component';

describe('NavcompComponent', () => {
  let component: NavcompComponent;
  let fixture: ComponentFixture<NavcompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavcompComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavcompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
