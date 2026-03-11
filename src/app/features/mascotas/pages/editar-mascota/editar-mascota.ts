import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Mascota } from '../../../../models/mascotas.model';
import { MascotaService } from '../../../../services/mascotas';

@Component({
  selector: 'app-editar-mascota',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './editar-mascota.html',
  styleUrl: '../crear-mascota/crear-mascota.css',
})
export class EditarMascota implements OnInit {
  idMascota!: number;

  // Objeto vinculado al modelo Mascota
  mascota: Mascota = {
    id_mascota: 0,
    nombre: '',
    dueno: '',
    telefono: '',
    email: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mascotaService: MascotaService
  ) { }

  ngOnInit() {
    // Obtenemos el ID de la mascota desde la ruta
    this.idMascota = Number(this.route.snapshot.paramMap.get('id'));

    // Cargamos los datos actuales de la mascota
    this.mascotaService.obtenerMascotaPorId(this.idMascota).subscribe({
      next: (data) => {
        this.mascota = { ...data };
      },
      error: (err) => {
        alert('No se encontró la mascota');
        this.router.navigate(['/mascotas']);
      }
    });
  }

  actualizarMascota() {
    this.mascotaService.actualizarMascota(this.idMascota, this.mascota).subscribe({
      next: () => {
        alert('Mascota actualizada correctamente');
        this.router.navigate(['/mascotas']);
      },
      error: (err) => {
        console.error(err);
        alert('Error al actualizar la mascota');
      }
    });
  }
}
