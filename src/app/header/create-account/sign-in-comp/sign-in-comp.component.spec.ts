import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInCompComponent } from './sign-in-comp.component';

describe('SignInCompComponent', () => {
  let component: SignInCompComponent;
  let fixture: ComponentFixture<SignInCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInCompComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
