export interface Cita {
    id_cita?: number;      // Opcional (?) porque al crear una nueva aún no tiene ID
    mascota: string;
    veterinario: string;
    fecha: string;         // Formato 'YYYY-MM-DD'
    hora: string;          // Formato 'HH:mm'
}