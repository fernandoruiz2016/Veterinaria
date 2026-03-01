import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HomeCard } from '../../components/home-card/home-card';
import { TableComponent } from '../../components/table/table';
import { DashboardService } from '../../../../services/dashboard';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeCard, TableComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  citasHoy: number = 0;
  totalCitas: number = 0;
  totalPacientes: number = 0;

  // 2. Inyecta el ChangeDetectorRef
  constructor(
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarResumen();
  }

  cargarResumen(): void {
    this.dashboardService.obtenerDashboard().subscribe({
      next: (data) => {
        // Asignamos los valores directamente
        this.citasHoy = data.citas_hoy_count;
        this.totalCitas = data.citas_pendientes;
        this.totalPacientes = data.total_pacientes;

        // 3. Obligamos a Angular a actualizar la pantalla
        this.cdr.detectChanges(); 
      },
      error: (err) => console.error(err)
    });
  }
}
