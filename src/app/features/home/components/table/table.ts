import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CitaService } from '../../../../services/citas';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cita } from '../../../../models/citas.model';
import { DashboardService } from '../../../../services/dashboard';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './table.html',
  styleUrls: ['./table.css'],
})
export class TableComponent implements OnInit {
  citas: Cita[] = [];

  constructor(
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas(): void {
    this.dashboardService.obtenerDashboard().subscribe({
      next: (data) => {
        // Usamos la propiedad que contiene el ARRAY
        this.citas = data.citas_hoy_lista;
        console.log('Citas filtradas para la tabla:', this.citas);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar mock:', err)
    });
  }
}