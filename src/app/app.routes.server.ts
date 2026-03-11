import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Rutas con parámetros dinámicos: se renderizan en el servidor bajo demanda
  { path: 'mascotas/editar/:id',  renderMode: RenderMode.Server },
  { path: 'mascotas/historial/:id', renderMode: RenderMode.Server },
  { path: 'citas/editar/:id',     renderMode: RenderMode.Server },
  { path: 'duenos/editar/:id',    renderMode: RenderMode.Server },
  // El resto de rutas estáticas se pre-renderizan normalmente
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
