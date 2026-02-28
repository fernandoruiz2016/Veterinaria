import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Mascota } from '../models/mascotas.model';


@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  private mascotas: Mascota[] = [
    { id_mascota: 1, nombre: 'Lucas', dueno: 'Juan Perez', telefono: '987654321', email: 'juan@mail.com' },
    { id_mascota: 2, nombre: 'Pelusa', dueno: 'Maria Lopez', telefono: '912345678', email: 'maria@mail.com' },
    { id_mascota: 3, nombre: 'Rex', dueno: 'Carlos Ruiz', telefono: '955443322', email: 'carlos@mail.com' }
  ];

  constructor() { }

  obtenerMascotas(): Observable<Mascota[]> {
    return of([...this.mascotas]);
  }

  obtenerMascotaPorId(id: number): Observable<Mascota> {
    const mascota = this.mascotas.find(m => m.id_mascota === id);
    return mascota ? of({ ...mascota }) : throwError(() => new Error('Mascota no encontrada'));
  }

  crearMascota(nuevaMascota: Mascota): Observable<Mascota> {
    const maxId = this.mascotas.length > 0 ? Math.max(...this.mascotas.map(m => m.id_mascota || 0)) : 0;
    const mascotaGuardar: Mascota = { ...nuevaMascota, id_mascota: maxId + 1 };
    this.mascotas.push(mascotaGuardar);
    return of(mascotaGuardar);
  }

  actualizarMascota(id: number, datos: Mascota): Observable<Mascota> {
    const index = this.mascotas.findIndex(m => m.id_mascota === id);
    if (index !== -1) {
      this.mascotas[index] = { ...datos, id_mascota: id };
      return of({ ...this.mascotas[index] });
    }
    return throwError(() => new Error('No se pudo actualizar la mascota'));
  }

  eliminarMascota(id: number): Observable<boolean> {
    const inicial = this.mascotas.length;
    this.mascotas = this.mascotas.filter(m => m.id_mascota !== id);
    return of(this.mascotas.length < inicial);
  }
}