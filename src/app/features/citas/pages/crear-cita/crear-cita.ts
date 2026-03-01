import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../../../services/citas';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MascotaService } from '../../../../services/mascotas';
import { Cita } from '../../../../models/citas.model';
import { Mascota } from '../../../../models/mascotas.model';

@Component({
  selector: 'app-crear-cita',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './crear-cita.html',
  styleUrl: './crear-cita.css',
})
export class CrearCita implements OnInit {
  nuevaCita: Cita = {
    id_cita: 0, // El servicio se encargará de asignar el ID correcto
    mascota: '',
    veterinario: '',
    fecha: '',
    hora: '',
    estado: 'Programada', // Valor inicial
    comentarios: '',
  };

  mascotas: Mascota[] = [];

  constructor(
    private citaService: CitaService,
    private mascotaService: MascotaService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.cargarMascotas();
  }

  cargarMascotas(): void {
    this.mascotaService.obtenerMascotas().subscribe({
      next: (data) => {
        this.mascotas = data;
        console.log('Mascotas cargadas para el select:', this.mascotas);
      },
      error: (err) => console.error('Error al cargar mascotas', err)
    });
  }

  guardarCita() {
    this.citaService.crearCita(this.nuevaCita).subscribe({
      next: () => {
        alert('¡Cita registrada con éxito!');
        this.router.navigate(['/citas']);
      },
      error: (err) => alert('Error al guardar la cita.')
    });
  }
}
