import { Routes } from '@angular/router';
import { Home } from './features/home/pages/home/home';
import { Layout } from './shared/layout/layout';
import { CitasComponent } from './features/citas/pages/citas-component/citas-component';
import { CrearCita } from './features/citas/pages/crear-cita/crear-cita';
import { EditarCita } from './features/citas/pages/editar-cita/editar-cita';
import { MascotasComponent } from './features/mascotas/pages/mascotas-component/mascotas-component';
import { CrearMascota } from './features/mascotas/pages/crear-mascota/crear-mascota';
import { EditarMascota } from './features/mascotas/pages/editar-mascota/editar-mascota';
import { VerHistorial } from './features/mascotas/pages/ver-historial/ver-historial';
import { DuenosComponent } from './features/duenos/pages/duenos-component/duenos-component';
import { CrearDueno } from './features/duenos/pages/crear-dueno/crear-dueno';
import { EditarDueno } from './features/duenos/pages/editar-dueno/editar-dueno';

export const routes: Routes = [
    {
        path: '',
        component: Layout,
        children: [
            { path: '', component: Home },

            { path: 'mascotas', component: MascotasComponent },
            { path: 'mascotas/crear', component: CrearMascota },
            { path: 'mascotas/editar/:id', component: EditarMascota },
            { path: 'mascotas/historial/:id', component: VerHistorial },

            { path: 'duenos', component: DuenosComponent },
            { path: 'duenos/crear', component: CrearDueno },
            { path: 'duenos/editar/:id', component: EditarDueno },

            { path: 'citas', component: CitasComponent },
            { path: 'citas/crear', component: CrearCita },
            { path: 'citas/editar/:id', component: EditarCita },
        ],
    },
];
