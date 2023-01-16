import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSearchCompComponent } from './main-search-comp.component';

describe('MainSearchCompComponent', () => {
  let component: MainSearchCompComponent;
  let fixture: ComponentFixture<MainSearchCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainSearchCompComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainSearchCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
