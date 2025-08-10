import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericMultasTableComponent } from './generic-multas-table.component';

describe('GenericMultasTableComponent', () => {
  let component: GenericMultasTableComponent;
  let fixture: ComponentFixture<GenericMultasTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericMultasTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericMultasTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
