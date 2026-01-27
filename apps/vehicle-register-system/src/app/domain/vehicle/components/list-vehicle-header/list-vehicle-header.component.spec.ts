import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListVehicleHeaderComponent } from './list-vehicle-header.component';

describe('ListVehicleHeaderComponent', () => {
  let component: ListVehicleHeaderComponent;
  let fixture: ComponentFixture<ListVehicleHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListVehicleHeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVehicleHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
