import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-create-course',
  imports: [ReactiveFormsModule],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.css'
})
export class CreateCourseComponent implements OnInit{

  courseForm!:FormGroup
  constructor(private fb: FormBuilder,private coursesService:CoursesService){}
  ngOnInit(): void {
     this.courseForm = this.fb.group({
          title: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
          description: ['', [Validators.required, Validators.minLength(15)]],
          teacherId: ['', [Validators.required, Validators.min(1)]],
        })
  }

 get course():{[key:string]:AbstractControl}{
    return this.courseForm.controls;
  }
  onSubmit() {
this.coursesService.addNewCourse(this.courseForm.value).subscribe({
  next:response=>{
alert('✅' + response.message)
  },error:(e)=>{
    alert('❌ ERROR: ' + (e.error.message || 'משהו השתבש'))  }
});
  }
}
