import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course, Lesson } from '../models/course';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http:HttpClient) { }
  getCourses(): Observable<any>{
    return this.http.get<Course[]>('http://localhost:3000/api/courses')
  }
  getLessonsByCourse(courseId:number): Observable<any>{
    console.log('in lesson service ');
   return this.http.get<Lesson[]>(`http://localhost:3000/api/courses/${courseId}/lessons`)
  }
  addNewCourse(course:Course):Observable<any>{
    return this.http.post<any>('http://localhost:3000/api/courses',course)
  }
  updateCourse(courseId:number,course:Course){
    return this.http.put(`http://localhost:3000/api/courses/${courseId}`,course)
  }
}
