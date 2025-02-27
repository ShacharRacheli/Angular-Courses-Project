import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { log } from 'console';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  // user !:UserLogin
  userLoginForm!:FormGroup;
  constructor(private fb:FormBuilder,private userService:AuthService){}
get user():{[key:string]:AbstractControl}{
  return this.userLoginForm.controls;
}
  ngOnInit(): void {
    this.userLoginForm=this.fb.group({
email:['',[Validators.required,Validators.email]],
password:['',[Validators.required,Validators.minLength(5)]]
})
  }
  onSubmit(){
    const user=this.userLoginForm.value;
   this.userService.login(this.userLoginForm.value).subscribe({next:response=>{this.userService.saveToken(response.token)}
    ,error:(e)=>{
console.error(e.error.message)
   }})  
}
}
