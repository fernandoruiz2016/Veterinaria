import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MascotaService } from '../../../../services/mascotas';
import { Mascota } from '../../../../models/mascotas.model';

@Component({
  selector: 'app-mascotas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './mascotas-component.html',
  styleUrls: ['./mascotas-component.css'],
})
export class MascotasComponent implements OnInit {
  mascotas: Mascota[] = [];
  filtros = { nombre: '', dueno: '', telefono: '' };

  constructor(
    private mascotaService: MascotaService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.onFiltrar();
  }

  onFiltrar(): void {
    this.mascotaService.filtrarMascotas(this.filtros).subscribe({
      next: (data) => {
        this.mascotas = data;
        console.log('Resultados encontrados:', this.mascotas.length);
        this.cdr.detectChanges(); 
      }
    });
  }

  eliminarMascota(id: number | undefined) {
    if (!id) return;

    if (confirm('¿Estás seguro de que deseas eliminar esta mascota?')) {
      this.mascotaService.eliminarMascota(id).subscribe({
        next: (success) => {
          if (success) {
            this.onFiltrar(); // Recargamos la lista filtrada
            alert('Mascota eliminada correctamente');
          }
        },
        error: () => alert('Error al eliminar la mascota')
      });
    }
  }
}
