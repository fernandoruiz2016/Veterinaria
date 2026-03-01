import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators'; // Opcional: para simular tiempo de carga
import { Cita } from '../models/citas.model';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private citas: Cita[] = [
    {
      id_cita: 1,
      mascota: 'Lucas',
      veterinario: 'Dr. Pérez',
      fecha: '2026-03-01',
      hora: '20:00',
      estado: 'Programada'
    },
  ];

  constructor() { }

  obtenerCitas(): Observable<Cita[]> {
    return of([...this.citas]).pipe(delay(200));
  }

    // Cambiamos any por Cita
  obtenerCitaPorId(id: number): Observable<Cita> {
    const cita = this.citas.find(c => c.id_cita === id);
    return cita ? of({ ...cita }) : throwError(() => new Error('Cita no encontrada'));
  }
  
  crearCita(nuevaCita: Cita): Observable<Cita> {
    // Lógica más segura para el ID: busca el máximo y suma 1
    const maxId = this.citas.length > 0 ? Math.max(...this.citas.map(c => c.id_cita || 0)) : 0;
    const citaGuardar: Cita = { ...nuevaCita, id_cita: maxId + 1 };

    this.citas.push(citaGuardar);
    return of(citaGuardar);
  }

  // Cambiamos any por Cita
  actualizarCita(id: number, datosActualizados: Cita): Observable<Cita> {
    const index = this.citas.findIndex(c => c.id_cita === id);

    if (index !== -1) {
      this.citas[index] = { ...datosActualizados, id_cita: id };
      return of({ ...this.citas[index] });
    }
    return throwError(() => new Error('No se pudo encontrar la cita para actualizar'));
  }

  eliminarCita(id: number): Observable<boolean> {
    const inicial = this.citas.length;
    this.citas = this.citas.filter(c => c.id_cita !== id);
    return of(this.citas.length < inicial);
  }

  filtrarCitas(filtros: any): Observable<Cita[]> {
    let filtradas = [...this.citas];

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

  return of(filtradas).pipe(delay(100));
  }
}