import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CitaService } from '../../../../services/citas';
import { Cita } from '../../../../models/citas.model';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './citas-component.html',
  styleUrls: ['./citas-component.css'],
})
export class CitasComponent implements OnInit {
  citas: Cita[] = [];
  filtros = { mascota: '', fecha: '', estado: '' };

  constructor(
    private citaService: CitaService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.onFiltrar();
  }

  onFiltrar(): void {
    this.citaService.filtrarCitas(this.filtros).subscribe({
      next: (data) => {
        this.citas = data;
        console.log('Resultados encontrados:', this.citas.length);
        this.cdr.detectChanges(); 
      }
    });
  }

  eliminarCita(id: number | undefined) {
    if (!id) return;

    if (confirm('¿Estás seguro de que deseas eliminar esta cita?')) {
      this.citaService.eliminarCita(id).subscribe({
        next: (success) => {
          if (success) {
            this.onFiltrar(); // Recargamos la lista filtrada
            alert('Cita eliminada correctamente');
          }
        },
        error: () => alert('Error al eliminar la cita')
      });
    }
  }
}
