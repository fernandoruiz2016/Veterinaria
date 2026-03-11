import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MascotaService } from '../../../../services/mascotas';
import { Mascota } from '../../../../models/mascotas.model';

@Component({
  selector: 'app-crear-mascota',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './crear-mascota.html',
  styleUrl: './crear-mascota.css',
})
export class CrearMascota {
nuevaMascota: Mascota = {
    id_mascota: 0,
    nombre: '',
    dueno: '',
    telefono: '',
    email: ''
  };

  constructor(
    private mascotaService: MascotaService,
    private router: Router
  ) {}

  guardarMascota() {
    this.mascotaService.crearMascota(this.nuevaMascota).subscribe({
      next: (mascotaGuardada) => {
        console.log('Mascota guardada en memoria:', mascotaGuardada);
        alert('¡Mascota registrada con éxito!');
        this.router.navigate(['/mascotas']); // Redirige a la lista de mascotas
      },
      error: (err) => {
        console.error(err);
        alert('Error al registrar la mascota.');
      }
    });
  }
}
