import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { AuthService } from '../../services/auth.service';
import { response } from 'express';
import { Course, Lesson } from '../../models/course';

@Component({
  selector: 'app-courses',
  imports: [],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit{

 public allCourses:Course[]=[]
// public lessons:Lesson[]=[]
constructor(private coursesService:CoursesService){}
ngOnInit(): void {
  this.coursesService.getCourses().subscribe({
    next: response => {
      this.allCourses = response; // Assign the response to allCourses
      console.log(this.allCourses);  
    },
    error: e => {
      console.error(e.error.message);
    }
  });
this.coursesDetails();
}

coursesDetails(){
  this.allCourses.forEach(course => {
    this.coursesService.getLessonsByCourse(+course.id).subscribe(
      {next:(lessons)=>{
        
  course.lessons=lessons
  console.log(lessons);
  
      },error:(e)=>{
  console.error(`Failed to fetch lessons of course ${+course.id}`,e)
      }}
    )
  });
}
}
// n() {
//   this.courses.forEach(course => {

//    this.courseService.getlessons(course.id).subscribe({
//       next: (lessons) => {
//         course.lessons = lessons; 
//       },
//       error: (err) => {
//         console.error(`Error fetching lessons for course ${course.id}`, err);
//       }
//     });
//   });
// }

// function getIdFromToken(token: string): string | null {
//   try {
//     const decoded: any = jwtDecode(token);
//     return decoded.id || null; // הנח שה-ID נמצא במפתח 'id'
//   } catch (error) {
//     console.error('Invalid token', error);
//     return null;
//   }
// }