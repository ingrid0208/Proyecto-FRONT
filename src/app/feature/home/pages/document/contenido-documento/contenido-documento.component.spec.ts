import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoDocumentoComponent } from './contenido-documento.component';

describe('ContenidoDocumentoComponent', () => {
  let component: ContenidoDocumentoComponent;
  let fixture: ComponentFixture<ContenidoDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenidoDocumentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenidoDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
