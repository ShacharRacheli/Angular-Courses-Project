import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CoursesComponent } from "../courses/courses.component";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, RouterOutlet, CoursesComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{
token:any=''
  userName!:string
  constructor(private authService:AuthService){}
  ngOnInit(): void {

    this.token=this.authService.getToken();
    this.userName=this.authService.getUserNameFromToken();
  }
  

}
