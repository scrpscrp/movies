import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearcResultComponent } from './searc-result.component';

describe('SearcResultComponent', () => {
  let component: SearcResultComponent;
  let fixture: ComponentFixture<SearcResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearcResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearcResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
