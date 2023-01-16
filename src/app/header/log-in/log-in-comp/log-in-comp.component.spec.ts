import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInCompComponent } from './log-in-comp.component';

describe('LogInCompComponent', () => {
  let component: LogInCompComponent;
  let fixture: ComponentFixture<LogInCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogInCompComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogInCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
