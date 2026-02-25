import { Component } from '@angular/core';
import { HomeCard } from "../../components/home-card/home-card";

@Component({
  selector: 'app-home',
  imports: [HomeCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  citas: number = 24;
  pacientesNuevos: number = 10;
  citasPendientes: number = 13;
}
