import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomePageComponent } from "../components/home-page/home-page.component";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomePageComponent,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'CoursesOnline';
  token:any=''
  constructor(private authService:AuthService){}
  ngOnInit(): void {
    this.token=this.authService.getToken()
  }
}
