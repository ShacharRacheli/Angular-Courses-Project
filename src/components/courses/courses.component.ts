import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { AuthService } from '../../services/auth.service';
import { response } from 'express';
import { Course, Lesson } from '../../models/course';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-courses',
  imports: [ReactiveFormsModule,MatListModule,MatButtonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  role: string = ''
  courseForm!: FormGroup
  lessonForm!: FormGroup
  // lessonAddForm!: FormGroup
  lessonFormValues!:any
  lessonUpdate!:Lesson;
  lessonAdd!:Lesson;
  idCurrentLesson:number=-1;
  isUpdate: boolean = false
  idCurrentCourse: number = -1
  currentCourse: any;
  courseUpdate!:Course;
  isUpdateLesson:Boolean=false
  isAddLesson:Boolean=false
  courseIsLessonUpdate:number=-1

  setIsUpdate(course: Course) {
    this.isUpdate = !this.isUpdate
    // this.currentCourse = course;
    this.idCurrentCourse = course.id
    this.courseForm.setValue({
      title: course.title,
      description: course.description,
    });
  }
  setIsUpdateLesson(lesson:Lesson){
    this.isUpdateLesson=!this.isUpdateLesson;
    this.idCurrentLesson=lesson.id;
    this.courseIsLessonUpdate=lesson.courseId
this.lessonForm.setValue({
  title: lesson.title,
  content: lesson.content,
})
  }
  setIsAddLesson(courseId:number){
    this.isAddLesson=!this.isAddLesson
    this.idCurrentLesson=courseId;
  }
  public allCourses: Course[] = []
  public lessons:Lesson[]=[]
  constructor(private coursesService: CoursesService, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.coursesService.getCourses().subscribe({
      next: response => {
        this.allCourses = response; // Assign the response to allCourses
        console.log(this.allCourses);
        this.coursesDetails();
      },
      error: e => {
        console.error(e.error.message);
      }
    });
    this.role = this.coursesService.getRoleByToken()
    this.coursesService.getUserIdByToken()

    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      description: ['', [Validators.required, Validators.minLength(15)]],
      // teacherId: ['', [Validators.required, Validators.min(1)]],
    })
    this.lessonForm=this.fb.group({
      title: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      content: ['', [Validators.required, Validators.minLength(15)]],
    })
  }

  coursesDetails(){
    this.allCourses.forEach(course => {
      this.coursesService.getLessonsByCourse(course.id).subscribe(
        {next:(lessons)=>{

          course.lessons=lessons
          console.log(lessons);

        },error:(e)=>{
          console.error(`Failed to fetch lessons of course ${+course.id}`,e)
        }}
      )
    });
  }
  get course(): { [key: string]: AbstractControl } {
    return this.courseForm.controls;
  }
  deleteCourse(courseId: number) {
    this.coursesService.deleteCourse(courseId).subscribe({
      next: (response) => {
        alert(`Course ${courseId} was deleted successfully`)
        this.allCourses = this.allCourses.filter(course => course.id !== courseId);
      }, error: (e) => {
        alert('Something went wrong')
      }
    })

  }
  onSubmitLesonUpdate(){
    this.isUpdateLesson=!this.isUpdateLesson
    this.lessonUpdate=this.lessonForm.value
    this.lessonUpdate.id=this.idCurrentLesson
    this.lessonUpdate.courseId=this.courseIsLessonUpdate
    // let lessonIndex:number=-1
    this.coursesService.updateLesson(this.lessonUpdate).subscribe({
      next:updatedLesson=>{
        const course = this.allCourses.find(c => c.id === this.courseIsLessonUpdate);
      if (course) {
       const  lessonIndex = course.lessons?.findIndex(l => l.id === this.idCurrentLesson);
        if (lessonIndex !== -1&&course.lessons) {
          // course.lessons[lessonIndex] = updatedLesson; // Replace the old lesson with the updated one
        }}
    },error:(e)=>{
    
    }});
  }
  onSubmit() {
    this.updateCourse()
    // this.setIsUpdate()
    this.isUpdate = !this.isUpdate
  }
  updateCourse() {
    this.courseUpdate=this.courseForm.value
this.courseUpdate.teacherId=this.coursesService.getUserIdByToken()
this.courseUpdate.id=this.idCurrentCourse
    this.coursesService.updateCourse(this.courseUpdate).subscribe({
      next:(response)=>{
alert('Update successfully');
this.allCourses = this.allCourses.map(course =>
  course.id === this.courseUpdate.id ? this.courseUpdate : course
);
      },error:(e)=>{
alert('errorrrrrrrrrr')
      }
    })
  }
onSubmitAddLesson(){
  this.isAddLesson=!this.isAddLesson
  this.lessonAdd=this.lessonForm.value
  this.lessonAdd.courseId=this.idCurrentCourse
  this.coursesService.addLesson(this.lessonAdd).subscribe({
    next:(newLesson)=>{
  const course = this.allCourses.find(c => c.id === this.idCurrentCourse);
  if (course) {
    course.lessons?.push(newLesson); // Add the new lesson to the course's lessons array
  }
    },error:(e)=>{
      alert('errorrrrrrrrrr')
    }
  })


}
// updateLesson(lesson:Lesson){

// }
deleteLesson(courseId:number,lessonId:number){
this.coursesService.deleteLesson(courseId,lessonId).subscribe();
}
}
