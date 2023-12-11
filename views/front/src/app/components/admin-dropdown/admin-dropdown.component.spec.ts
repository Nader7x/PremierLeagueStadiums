import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDropdownComponent } from './admin-dropdown.component';

describe('AdminDropdownComponent', () => {
  let component: AdminDropdownComponent;
  let fixture: ComponentFixture<AdminDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDropdownComponent]
    });
    fixture = TestBed.createComponent(AdminDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
