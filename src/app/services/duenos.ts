import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Dueno } from '../models/duenos.model';

@Injectable({
  providedIn: 'root'
})
export class DuenoService {
  private duenos: Dueno[] = [
    {
      id_dueno: 1,
      nombre: 'Juan Perez',
      telefono: '987654321',
      email: 'juan@mail.com',
      direccion: 'Av. Principal 123'
    },
    {
      id_dueno: 2,
      nombre: 'Maria Lopez',
      telefono: '912345678',
      email: 'maria@mail.com',
      direccion: 'Jr. Los Cedros 456'
    },
    {
      id_dueno: 3,
      nombre: 'Carlos Ruiz',
      telefono: '955443322',
      email: 'carlos@mail.com',
      direccion: 'Calle Las Flores 789'
    }
  ];

  private duenos$ = new BehaviorSubject<Dueno[]>([...this.duenos]);

  constructor() { }

  /** Emite cada vez que la lista cambia */
  obtenerDuenos(): Observable<Dueno[]> {
    return this.duenos$.asObservable();
  }

  obtenerDuenoPorId(id: number): Observable<Dueno> {
    const dueno = this.duenos.find(d => d.id_dueno === id);
    return dueno ? of({ ...dueno }) : throwError(() => new Error('Dueño no encontrado'));
  }

  crearDueno(nuevoDueno: Dueno): Observable<Dueno> {
    const maxId = this.duenos.length > 0 ? Math.max(...this.duenos.map(d => d.id_dueno || 0)) : 0;
    const duenoGuardar: Dueno = { ...nuevoDueno, id_dueno: maxId + 1 };
    this.duenos.push(duenoGuardar);
    this.duenos$.next([...this.duenos]);
    return of(duenoGuardar);
  }

  actualizarDueno(id: number, datos: Dueno): Observable<Dueno> {
    const index = this.duenos.findIndex(d => d.id_dueno === id);
    if (index !== -1) {
      this.duenos[index] = { ...datos, id_dueno: id };
      this.duenos$.next([...this.duenos]);
      return of({ ...this.duenos[index] });
    }
    return throwError(() => new Error('No se pudo actualizar el dueño'));
  }

  eliminarDueno(id: number): Observable<boolean> {
    const inicial = this.duenos.length;
    this.duenos = this.duenos.filter(d => d.id_dueno !== id);
    this.duenos$.next([...this.duenos]);
    return of(this.duenos.length < inicial);
  }

  filtrarDuenos(filtros: any): Observable<Dueno[]> {
    let filtrados = [...this.duenos];

    if (filtros.nombre) {
      const nombreBusqueda = filtros.nombre.toLowerCase();
      filtrados = filtrados.filter(d =>
        d.nombre.toLowerCase().includes(nombreBusqueda)
      );
    }

    if (filtros.telefono) {
      filtrados = filtrados.filter(d => d.telefono.includes(filtros.telefono));
    }

    if (filtros.email) {
      const emailBusqueda = filtros.email.toLowerCase();
      filtrados = filtrados.filter(d => d.email.toLowerCase().includes(emailBusqueda));
    }

    return of(filtrados);
  }
}