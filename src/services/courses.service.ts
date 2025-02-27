import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course, Lesson } from '../models/course';
import { Observable } from 'rxjs/internal/Observable';
import { jwtDecode } from 'jwt-decode';

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
  updateCourse(course:Course){
    return this.http.put(`http://localhost:3000/api/courses/${course.id}`,course);
  }
  deleteCourse(courseId:number){
    return this.http.delete(`http://localhost:3000/api/courses/${courseId}`);
  }
  deleteLessonsByCourseId(courseId:number){
    return this.http.delete(`http://localhost:3000/api/courses/${courseId}/lessons`);
  }
  deleteLesson(courseId:number,lessonId:number){
    return this.http.delete(`http://localhost:3000/api/courses/${courseId}/lessons/${lessonId}`);
  }
  addLesson(lesson:Lesson){
return this.http.post<Lesson>(`http://localhost:3000/api/courses/${lesson.courseId}/lessons`,lesson);
  }
  updateLesson(lesson:Lesson){
    return this.http.put(`http://localhost:3000/api/courses/${lesson.courseId}/lessons/${lesson.id}`,lesson)
  }
  getRoleByToken():string{
    const token = sessionStorage.getItem('token');
      if (!token) return ''
      try {
        const decodedToken: any = jwtDecode(token)
        // console.log(decodedToken)
        // console.log(decodedToken.role);
        return decodedToken.role
      }
      catch (error) {
        console.error('שגיאה בפענוח ה-Token:', error)
        return ''
      }
  }
  getUserIdByToken():number{
    const token = sessionStorage.getItem('token');
    if (!token) return -1
    try {
      const decodedToken: any = jwtDecode(token)
      // console.log(decodedToken)
      // console.log(decodedToken.userId);
      return decodedToken.userId
    }
    catch (error) {
      console.error('שגיאה בפענוח ה-Token:', error)
      return -1
    }
  }
}
