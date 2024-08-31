/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListVehiclePageComponent } from './list-vehicle-page.component';

describe('ListVehiclePageComponent', () => {
  let component: ListVehiclePageComponent;
  let fixture: ComponentFixture<ListVehiclePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListVehiclePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVehiclePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
