import Dashboard from './components/Dashboard.vue';
import Account from './components/Account.vue';
import Grades from './components/Grades.vue';
import Home from './components/Home.vue';
import Users from './components/User/Users.vue';
import EditUser from './components/User/EditUser.vue';
import Instructors from './components/User/Instructors.vue';
import Students from './components/User/Students.vue';
import Course from './components/Course/Course.vue';
import EditCourse from './components/Course/EditCourse.vue';
import Courses from './components/Course/Courses.vue'; 
import Section from './components/Section/Section.vue';
import EditSection from './components/Section/EditSection.vue';
import NewUser from './components/User/NewUser.vue';

const routes = [
    { 
    	path: '/', 
    	component: Home 
    },
    { 
    	path: '/Account', 
    	component: Account 
    },
    { 
    	path: '/Dashboard', 
    	component: Dashboard 
    },
    { 
    	path: '/Grades', 
    	component: Grades 
    },
    {  
        name: 'new_user',
        path: '/new_user', 
        component: NewUser 
    },
    {  
    	name: 'users',
    	path: '/users', 
    	component: Users 
    },
    {  
    	name: 'edit_user',
    	path: '/edit_user/:id', 
    	component: EditUser
    },
    {  
        name: 'instructors',
        path: '/instructors', 
        component: Instructors
    },
    {  
        name: 'students',
        path: '/students', 
        component: Students
    },  
    {
        name: 'course',
        path: '/Course',
        component: Course
    },
    {
        name: 'editCourse',
        path: '/editCourse/:id',
        component: EditCourse
    },
    {
        name: 'courses',
        path: '/courses',
        component: Courses
    },
    {
        name: 'section',
        path: '/Section',
        component: Section
    },
    {
        name: 'editSection',
        path: '/editSection/:id',
        component: EditSection
    }
];

export default routes;
