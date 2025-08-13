import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposMultasComponent } from './tipos-multas.component';

describe('TiposMultasComponent', () => {
  let component: TiposMultasComponent;
  let fixture: ComponentFixture<TiposMultasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiposMultasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposMultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
