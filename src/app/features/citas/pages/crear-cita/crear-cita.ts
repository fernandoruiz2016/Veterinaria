import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../../../services/citas';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MascotaService } from '../../../../services/mascotas';
import { DuenoService } from '../../../../services/duenos';
import { Cita } from '../../../../models/citas.model';
import { Mascota } from '../../../../models/mascotas.model';
import { Dueno } from '../../../../models/duenos.model';

@Component({
  selector: 'app-crear-cita',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './crear-cita.html',
  styleUrl: './crear-cita.css',
})
export class CrearCita implements OnInit {
  nuevaCita: Cita = {
    id_cita: 0,
    mascota: '',
    dueno: '',
    veterinario: '',
    fecha: '',
    hora: '',
    estado: 'Programada',
    comentarios: '',
  };

  mascotas: Mascota[] = [];
  duenos: Dueno[] = [];

  // Toggle mascota: 'registrada' | 'nueva'
  modoMascota: 'registrada' | 'nueva' = 'registrada';

  // Toggle dueño: 'registrado' | 'nuevo'
  modoDueno: 'registrado' | 'nuevo' = 'registrado';

  constructor(
    private citaService: CitaService,
    private mascotaService: MascotaService,
    private duenoService: DuenoService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.cargarMascotas();
    this.cargarDuenos();
  }

  cargarMascotas(): void {
    this.mascotaService.obtenerMascotas().subscribe({
      next: (data) => { this.mascotas = data; },
      error: (err) => console.error('Error al cargar mascotas', err)
    });
  }

  cargarDuenos(): void {
    this.duenoService.obtenerDuenos().subscribe({
      next: (data) => { this.duenos = data; },
      error: (err) => console.error('Error al cargar dueños', err)
    });
  }

  cambiarModoMascota(modo: 'registrada' | 'nueva'): void {
    this.modoMascota = modo;
    this.nuevaCita.mascota = '';
  }

  cambiarModoDueno(modo: 'registrado' | 'nuevo'): void {
    this.modoDueno = modo;
    this.nuevaCita.dueno = '';
  }

  guardarCita() {
    this.citaService.crearCita(this.nuevaCita).subscribe({
      next: () => {
        alert('¡Cita registrada con éxito!');
        this.router.navigate(['/citas']);
      },
      error: () => alert('Error al guardar la cita.')
    });
  }
}
