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
          const date = new Date();
          const hoy = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

          // Filtramos las citas que son de hoy (Objetos completos)
          const listaCitasHoy = citas.filter(c => c.fecha === hoy);

          return {
            citas_hoy_lista: listaCitasHoy, // <--- Enviamos el ARRAY para la tabla
            citas_hoy_count: listaCitasHoy.length, // <--- Enviamos el NÚMERO para las cards
            citas_pendientes: citas.length,
            total_pacientes: mascotas.length
          };
        })
      );
    })
  );
}
}