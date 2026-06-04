import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./components/shared/navbar/navbar";
import { Loading } from './components/loading/loading';
import { Footer } from "./components/shared/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Loading, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('valorant_front');
}
