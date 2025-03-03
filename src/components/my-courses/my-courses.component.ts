import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../models/course';

@Component({
  selector: 'app-my-courses',
  imports: [],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent implements OnInit {
courseId:number=-1
course!:Course
  constructor(private courseService:CoursesService,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      const id=params.get('id')
 this.courseId=id?Number(id):-1;
this.course=this.courseService.getCourseById(this.courseId);
})
  }

}
