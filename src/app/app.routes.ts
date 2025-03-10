import { Routes } from '@angular/router';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { authGuard } from '../guards/auth.guard';
import { AuthComponent } from '../components/auth/auth.component';
import { CoursesComponent } from '../components/courses/courses.component';
import { teacherManagerGuard } from '../guards/teacher-manager.guard';
import { CourseDetailsComponent } from '../components/course-details/course-details.component';
import { MyCoursesComponent } from '../components/my-courses/my-courses.component';

export const routes: Routes = [
   { path: '', redirectTo: 'homePage', pathMatch: 'full' },
   {path:'homePage',component:HomePageComponent,canActivate:[authGuard]},
   {path:'login',component:LoginComponent},
   {path:'register',component:RegisterComponent},
   {path:'auth',component:AuthComponent},
   {path:'coursesForTeacherManager',component:CoursesComponent,canActivate:[teacherManagerGuard]},
   {path:'coursesForAll',component:CourseDetailsComponent,},
   {path:'myCourses',component:MyCoursesComponent,},
];
