import { Component } from '@angular/core';
import { NavBar } from "../../components/nav-bar/nav-bar";
import { RouterOutlet } from '@angular/router';
import { Footer } from "../../components/footer/footer";

@Component({
  selector: 'app-layout',
  imports: [NavBar, RouterOutlet, Footer],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

}
