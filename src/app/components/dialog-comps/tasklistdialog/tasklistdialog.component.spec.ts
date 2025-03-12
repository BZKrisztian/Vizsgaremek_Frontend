/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TasklistdialogComponent } from './tasklistdialog.component';

describe('TasklistdialogComponent', () => {
  let component: TasklistdialogComponent;
  let fixture: ComponentFixture<TasklistdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasklistdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasklistdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
