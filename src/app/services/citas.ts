import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Cita } from '../models/citas.model';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private _citas: Cita[] = [
    {
      id_cita: 1,
      mascota: 'Lucas',
      veterinario: 'Dr. Pérez',
      fecha: '2026-03-10',
      hora: '10:00',
      estado: 'Programada'
    },
    {
      id_cita: 2,
      mascota: 'Pelusa',
      veterinario: 'Dra. García',
      fecha: '2026-03-10',
      hora: '11:30',
      estado: 'Programada'
    },
  ];

  private citas$ = new BehaviorSubject<Cita[]>([...this._citas]);

  constructor() { }

  /** Emite cada vez que la lista cambia (dashboard la usa en tiempo real) */
  obtenerCitas(): Observable<Cita[]> {
    return this.citas$.asObservable();
  }

  obtenerCitaPorId(id: number): Observable<Cita> {
    const cita = this._citas.find(c => c.id_cita === id);
    return cita ? of({ ...cita }) : throwError(() => new Error('Cita no encontrada'));
  }

  crearCita(nuevaCita: Cita): Observable<Cita> {
    const maxId = this._citas.length > 0 ? Math.max(...this._citas.map(c => c.id_cita || 0)) : 0;
    const citaGuardar: Cita = { ...nuevaCita, id_cita: maxId + 1 };
    this._citas.push(citaGuardar);
    this.citas$.next([...this._citas]);
    return of(citaGuardar);
  }

  actualizarCita(id: number, datosActualizados: Cita): Observable<Cita> {
    const index = this._citas.findIndex(c => c.id_cita === id);
    if (index !== -1) {
      this._citas[index] = { ...datosActualizados, id_cita: id };
      this.citas$.next([...this._citas]);
      return of({ ...this._citas[index] });
    }
    return throwError(() => new Error('No se pudo encontrar la cita para actualizar'));
  }

  eliminarCita(id: number): Observable<boolean> {
    const inicial = this._citas.length;
    this._citas = this._citas.filter(c => c.id_cita !== id);
    this.citas$.next([...this._citas]);
    return of(this._citas.length < inicial);
  }

  filtrarCitas(filtros: any): Observable<Cita[]> {
    let filtradas = [...this._citas];
    if (filtros.fecha) {
      filtradas = filtradas.filter(c => c.fecha === filtros.fecha);
    }
    if (filtros.estado) {
      filtradas = filtradas.filter(c => c.estado === filtros.estado);
    }
    if (filtros.mascota) {
      filtradas = filtradas.filter(c =>
        c.mascota.toLowerCase().includes(filtros.mascota.toLowerCase())
      );
    }
    return of(filtradas);
  }
}