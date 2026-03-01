export interface Cita {
    id_cita?: number;      // Opcional para nuevas citas
    mascota: string;
    veterinario: string;
    fecha: string;         // Formato 'YYYY-MM-DD'
    hora: string;          // Formato 'HH:mm'
    estado: 'Programada' | 'Atendida' | 'Cancelada' | 'No asistió'; // Estados definidos
    comentarios?: string;
}