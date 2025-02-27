import { Routes } from '@angular/router';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { CreateCourseComponent } from '../components/create-course/create-course.component';

export const routes: Routes = [
    {path:'homePage',component:HomePageComponent,
        children:[
            {path:'login',
                component:LoginComponent,
                 outlet: 'secondary' // הגדרת outlet משני
},
            {path:'register',
                component:RegisterComponent,
                outlet: 'secondary' // הגדרת outlet משני
            },
   ]
    },
    {path:'addCourse',component:CreateCourseComponent},
    
];
