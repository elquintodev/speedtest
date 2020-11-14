import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestResultDataTableComponent } from './test-result-data-table.component';

describe('TestResultDataTableComponent', () => {
  let component: TestResultDataTableComponent;
  let fixture: ComponentFixture<TestResultDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestResultDataTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestResultDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
