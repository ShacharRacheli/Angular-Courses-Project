import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-users-for-manager',
  imports: [],
  templateUrl: './users-for-manager.component.html',
  styleUrl: './users-for-manager.component.css'
})
export class UsersForManagerComponent {

  constructor(private http:HttpClient){}

  
}
