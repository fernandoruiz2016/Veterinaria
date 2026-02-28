import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { CitaService } from './citas';
import { MascotaService } from './mascotas';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private citaService: CitaService,
    private mascotaService: MascotaService
  ) {}

  obtenerDashboard(): Observable<any> {
    return this.mascotaService.obtenerMascotas().pipe(
    switchMap(mascotas => {
      return this.citaService.obtenerCitas().pipe(
        map(citas => {
          const hoy = new Date().toISOString().split('T')[0];
          return {
            citas_hoy: citas.filter(c => c.fecha === hoy).length,
            citas_pendientes: citas.length,
            total_pacientes: mascotas.length // Ahora viene de la lista real de mascotas
          };
        })
      );
    })
  );
  }
}