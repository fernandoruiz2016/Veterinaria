import { Component, OnDestroy, OnInit } from '@angular/core';
import { HomeCard } from '../../components/home-card/home-card';
import { TableComponent } from '../../components/table/table';
import { DashboardService } from '../../../../services/dashboard';
import { CitaService } from '../../../../services/citas';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cita } from '../../../../models/citas.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeCard, TableComponent, FormsModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  // Stats generales
  citasHoy: number = 0;
  totalCitas: number = 0;
  totalPacientes: number = 0;
  totalDuenos: number = 0;
  citasAtendidas: number = 0;
  citasCanceladas: number = 0;
  citasProgramadas: number = 0;
  citasNoAsistio: number = 0;
  fechaHoy: string = '';

  // Filtro de fecha para la tabla
  fechaFiltro: string = '';
  citasTabla: Cita[] = [];
  private todasLasCitas: Cita[] = [];

  private subDash!: Subscription;
  private subCitas!: Subscription;

  constructor(
    private dashboardService: DashboardService,
    private citaService: CitaService
  ) {}

  ngOnInit(): void {
    const d = new Date();
    this.fechaFiltro = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    this.fechaHoy = d.toLocaleDateString('es-PE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    this.subDash = this.dashboardService.obtenerDashboard().subscribe({
      next: (data) => {
        this.citasHoy        = data.citas_hoy_count;
        this.totalCitas      = data.citas_pendientes;
        this.totalPacientes  = data.total_pacientes;
        this.totalDuenos     = data.total_duenos;
        this.citasAtendidas  = data.citas_atendidas;
        this.citasCanceladas = data.citas_canceladas;
      },
      error: (err) => console.error(err)
    });

    this.subCitas = this.citaService.obtenerCitas().subscribe({
      next: (citas) => {
        this.todasLasCitas   = citas;
        this.citasProgramadas = citas.filter(c => c.estado === 'Programada').length;
        this.citasNoAsistio  = citas.filter(c => c.estado === 'No asistió').length;
        this.aplicarFiltro();
      }
    });
  }

  pct(valor: number): number {
    return this.totalCitas > 0 ? Math.round((valor / this.totalCitas) * 100) : 0;
  }

  aplicarFiltro(): void {
    this.citasTabla = this.fechaFiltro
      ? this.todasLasCitas.filter(c => c.fecha === this.fechaFiltro)
      : this.todasLasCitas;
  }

  onFechaChange(): void {
    this.aplicarFiltro();
  }

  limpiarFiltro(): void {
    this.fechaFiltro = '';
    this.aplicarFiltro();
  }

  ngOnDestroy(): void {
    this.subDash?.unsubscribe();
    this.subCitas?.unsubscribe();
  }
}
