import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Mascota } from '../models/mascotas.model';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  private _mascotas: Mascota[] = [
    { id_mascota: 1, nombre: 'Lucas',  dueno: 'Juan Perez',  telefono: '987654321', email: 'juan@mail.com' },
    { id_mascota: 2, nombre: 'Pelusa', dueno: 'Maria Lopez', telefono: '912345678', email: 'maria@mail.com' },
    { id_mascota: 3, nombre: 'Rex',    dueno: 'Carlos Ruiz', telefono: '955443322', email: 'carlos@mail.com' }
  ];

  private mascotas$ = new BehaviorSubject<Mascota[]>([...this._mascotas]);

  constructor() { }

  /** Emite cada vez que la lista cambia */
  obtenerMascotas(): Observable<Mascota[]> {
    return this.mascotas$.asObservable();
  }

  obtenerMascotaPorId(id: number): Observable<Mascota> {
    const mascota = this._mascotas.find(m => m.id_mascota === id);
    return mascota ? of({ ...mascota }) : throwError(() => new Error('Mascota no encontrada'));
  }

  crearMascota(nuevaMascota: Mascota): Observable<Mascota> {
    const maxId = this._mascotas.length > 0 ? Math.max(...this._mascotas.map(m => m.id_mascota || 0)) : 0;
    const mascotaGuardar: Mascota = { ...nuevaMascota, id_mascota: maxId + 1 };
    this._mascotas.push(mascotaGuardar);
    this.mascotas$.next([...this._mascotas]);
    return of(mascotaGuardar);
  }

  actualizarMascota(id: number, datos: Mascota): Observable<Mascota> {
    const index = this._mascotas.findIndex(m => m.id_mascota === id);
    if (index !== -1) {
      this._mascotas[index] = { ...datos, id_mascota: id };
      this.mascotas$.next([...this._mascotas]);
      return of({ ...this._mascotas[index] });
    }
    return throwError(() => new Error('No se pudo actualizar la mascota'));
  }

  eliminarMascota(id: number): Observable<boolean> {
    const inicial = this._mascotas.length;
    this._mascotas = this._mascotas.filter(m => m.id_mascota !== id);
    this.mascotas$.next([...this._mascotas]);
    return of(this._mascotas.length < inicial);
  }

  filtrarMascotas(filtros: any): Observable<Mascota[]> {
    let filtradas = [...this._mascotas];
    if (filtros.nombre) {
      filtradas = filtradas.filter(m =>
        m.nombre.toLowerCase().includes(filtros.nombre.toLowerCase())
      );
    }
    if (filtros.dueno) {
      filtradas = filtradas.filter(m =>
        m.dueno.toLowerCase().includes(filtros.dueno.toLowerCase())
      );
    }
    if (filtros.telefono) {
      filtradas = filtradas.filter(m => m.telefono.includes(filtros.telefono));
    }
    return of(filtradas);
  }
}