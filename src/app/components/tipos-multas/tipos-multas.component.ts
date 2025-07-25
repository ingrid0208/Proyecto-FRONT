import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-tipos-multas',
    standalone: true,
  imports: [CommonModule], 
  templateUrl: './tipos-multas.component.html',
  styleUrls: ['./tipos-multas.component.scss']
})
export class TiposMultasComponent {
  // Índice de multa activa (0=tipo1, 1=tipo2, etc.)
  selectedIndex = 0;

  tiposMultas = [
  {
    tipoMulta: 1,
    titulo: 'Infracciones De Tipo Uno',
    tarjetas: [
      {
        icon: 'pi-ban',
        color: 'red',
        titulo: 'Actos sexuales o exhibicionismo en espacios públicos o privados no autorizados.',
        descripcion: 'Incluye cualquier manifestación de afecto que se considere inapropiada según el entorno.'
      },
      {
        icon: 'pi-glass',
        color: 'orange',
        titulo: 'Consumo de bebidas alcohólicas en lugares no autorizados.',
        descripcion: 'Prohibido beber alcohol en espacios públicos o privados sin permiso.'
      },
      {
        icon: 'pi-times-circle',
        color: 'red',
        titulo: 'Discriminación por origen, orientación sexual o identidad de género.',
        descripcion: 'No se permite limitar o impedir manifestaciones de afecto por razones discriminatorias.'
      },
      {
        icon: 'pi-mobile',
        color: 'blue',
        wide: true,
        titulo: 'Uso indebido de telecomunicaciones y sistemas de emergencia.',
        descripcion: 'Incluye inducir a menores a realizar llamadas falsas o mal uso de sistemas de emergencia.'
      }
    ]
  },
  {
    tipoMulta: 2,
    titulo: 'Infracciones De Tipo Dos',
    tarjetas: [
      {
        icon: 'pi-eye',
        color: 'blue',
        titulo: 'Observación indebida con dispositivos.',
        descripcion: 'No se permite grabar o tomar fotos en espacios sin consentimiento.'
      },
      {
        icon: 'pi-lock',
        color: 'orange',
        titulo: 'Acceso no autorizado a propiedades.',
        descripcion: 'Entrar a lugares privados sin permiso puede generar sanciones.'
      },
      {
        icon: 'pi-volume-up',
        color: 'red',
        titulo: 'Ruido excesivo en espacios públicos.',
        descripcion: 'Generar molestias con alto volumen de sonido en horas no permitidas.'
      },
      {
        icon: 'pi-bolt',
        color: 'blue',
        wide: true,
        titulo: 'Interrupción del servicio público.',
        descripcion: 'Causar bloqueos intencionales en la vía pública u otros servicios.'
      }
    ]
  },
  {
    tipoMulta: 3,
    titulo: 'Infracciones De Tipo Tres',
    tarjetas: [
      {
        icon: 'pi-car',
        color: 'orange',
        titulo: 'Mal estacionamiento',
        descripcion: 'Estacionar en zonas no autorizadas.'
      },
      {
        icon: 'pi-exclamation-circle',
        color: 'red',
        titulo: 'Conducción temeraria',
        descripcion: 'Conducir de manera peligrosa poniendo en riesgo a otros.'
      },
      {
        icon: 'pi-clock',
        color: 'blue',
        titulo: 'No respetar semáforos',
        descripcion: 'Ignorar señales de tránsito puede provocar accidentes.'
      },
      {
        icon: 'pi-user-edit',
        color: 'red',
        wide: true,
        titulo: 'Uso de licencia falsa',
        descripcion: 'Circular con documentos fraudulentos representa una falta grave.'
      }
    ]
  },
  {
    tipoMulta: 4,
    titulo: 'Infracciones De Tipo Cuatro',
    tarjetas: [
      {
        icon: 'pi-exclamation-triangle',
        color: 'red',
        titulo: 'Poner en peligro la vida de otros',
        descripcion: 'Acciones que puedan causar daño grave a otras personas.'
      },
      {
        icon: 'pi-bomb',
        color: 'orange',
        titulo: 'Amenaza con explosivos o armas',
        descripcion: 'Incluso falsas alarmas pueden tener consecuencias legales.'
      },
      {
        icon: 'pi-fire',
        color: 'red',
        titulo: 'Incendios provocados',
        descripcion: 'Encender fuego en zonas prohibidas o peligrosas.'
      },
      {
        icon: 'pi-lock-open',
        color: 'blue',
        wide: true,
        titulo: 'Evadir autoridades o controles',
        descripcion: 'Huir de inspecciones oficiales representa una falta grave.'
      }
    ]
  }
];

  cambiarTipo(index: number) {
    this.selectedIndex = index;
  }
}
