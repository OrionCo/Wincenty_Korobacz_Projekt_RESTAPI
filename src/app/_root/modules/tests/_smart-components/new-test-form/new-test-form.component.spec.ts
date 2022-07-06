import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTestFormComponent } from './new-test-form.component';

describe('NewTestFormComponent', () => {
  let component: NewTestFormComponent;
  let fixture: ComponentFixture<NewTestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTestFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
