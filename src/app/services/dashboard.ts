import { Injectable } from '@angular/core';
import { Observable, map, switchMap, combineLatest } from 'rxjs';
import { CitaService } from './citas';
import { MascotaService } from './mascotas';
import { DuenoService } from './duenos';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private citaService: CitaService,
    private mascotaService: MascotaService,
    private duenoService: DuenoService
  ) {}

  obtenerDashboard(): Observable<any> {
    return combineLatest([
      this.mascotaService.obtenerMascotas(),
      this.citaService.obtenerCitas(),
      this.duenoService.obtenerDuenos()
    ]).pipe(
      map(([mascotas, citas, duenos]) => {
        const date = new Date();
        const hoy = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

        const listaCitasHoy = citas.filter(c => c.fecha === hoy);
        const citasAtendidas = citas.filter(c => c.estado === 'Atendida').length;
        const citasCanceladas = citas.filter(c => c.estado === 'Cancelada').length;

        return {
          citas_hoy_lista: listaCitasHoy,
          citas_hoy_count: listaCitasHoy.length,
          citas_pendientes: citas.length,
          citas_atendidas: citasAtendidas,
          citas_canceladas: citasCanceladas,
          total_pacientes: mascotas.length,
          total_duenos: duenos.length
        };
      })
    );
  }
}