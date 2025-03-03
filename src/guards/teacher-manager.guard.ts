import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CoursesService } from '../services/courses.service';

export const teacherManagerGuard: CanActivateFn = (route, state) => {
const isLogin=sessionStorage.getItem('token');
const router=inject(Router);
const service=inject(CoursesService);
const status=service.getRoleByToken()
console.log(status);

if(status==='admin'||status==='teacher'){
  // router.navigate(['/coursesForTeacherManager'])
  return true;
}
  return false;
};
