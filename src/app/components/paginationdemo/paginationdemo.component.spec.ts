import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationdemoComponent } from './paginationdemo.component';

describe('PaginationdemoComponent', () => {
  let component: PaginationdemoComponent;
  let fixture: ComponentFixture<PaginationdemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationdemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationdemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
