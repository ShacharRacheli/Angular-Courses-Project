import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomePageComponent } from "../components/home-page/home-page.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomePageComponent,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CoursesOnline';
}
