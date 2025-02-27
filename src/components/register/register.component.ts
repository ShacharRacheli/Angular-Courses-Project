import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRegister } from '../../models/userLogin';
import { log } from 'console';
import { AuthService } from '../../services/auth.service';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,MatFormFieldModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
userRegister!:UserRegister;
  userRegisterForm!: FormGroup;
  constructor( private fb: FormBuilder,private authService:AuthService) { }
  // constructor(private http: HttpClient, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.userRegisterForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      role: ['', [Validators.required]],
    })
  }
  get user():{[key:string]:AbstractControl}{
    return this.userRegisterForm.controls;
  }
  onSubmit(){
     this.userRegister=this.userRegisterForm.value;
    console.log(this.userRegister);   
    this.authService.register(this.userRegister).subscribe(
    {  next:response=>{
        alert('✅' + response.message)
          },error:(e)=>{
            alert('❌ ERROR: ' + (e.error.message || 'משהו השתבש'))  }
        });        

  }
}
