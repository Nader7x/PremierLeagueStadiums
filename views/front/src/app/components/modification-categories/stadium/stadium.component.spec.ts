import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StadiumComponent } from './stadium.component';

describe('StadiumComponent', () => {
  let component: StadiumComponent;
  let fixture: ComponentFixture<StadiumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StadiumComponent]
    });
    fixture = TestBed.createComponent(StadiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
