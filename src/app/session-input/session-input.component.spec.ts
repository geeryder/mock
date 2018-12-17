import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionInputComponent } from './session-input.component';

describe('SessionInputComponent', () => {
  let component: SessionInputComponent;
  let fixture: ComponentFixture<SessionInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
