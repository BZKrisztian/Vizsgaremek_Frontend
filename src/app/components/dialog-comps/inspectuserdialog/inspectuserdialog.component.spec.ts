/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InspectuserdialogComponent } from './inspectuserdialog.component';

describe('InspectuserdialogComponent', () => {
  let component: InspectuserdialogComponent;
  let fixture: ComponentFixture<InspectuserdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectuserdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectuserdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
