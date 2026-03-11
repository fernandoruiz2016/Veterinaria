import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Mascota } from '../../../../models/mascotas.model';
import { Cita } from '../../../../models/citas.model';
import { MascotaService } from '../../../../services/mascotas';
import { CitaService } from '../../../../services/citas';

@Component({
  selector: 'app-ver-historial',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ver-historial.html',
  styleUrl: './ver-historial.css',
})
export class VerHistorial implements OnInit {
  mascota?: Mascota;
  citasFiltradas: Cita[] = [];

  constructor(
    private route: ActivatedRoute,
    private mascotaService: MascotaService,
    private citaService: CitaService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

  this.mascotaService.obtenerMascotaPorId(id).subscribe({
    next: (m) => {
      if (m) {
        this.mascota = m;
        this.cargarHistorial(m.nombre);
      }
    },
    error: (err) => console.error('Error al cargar mascota', err)
  });
  }

  cargarHistorial(nombreMascota: string) {
    this.citaService.obtenerCitas().subscribe({
    next: (todas) => {
      const filtradas = todas
        .filter(c => c.mascota.trim().toLowerCase() === nombreMascota.trim().toLowerCase())
        .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

      this.citasFiltradas = [...filtradas];

      this.cdr.detectChanges();
    }
  });
  }
}
