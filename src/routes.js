import Dashboard from './components/Dashboard.vue';
import Account from './components/Account.vue';
import Grades from './components/Grades.vue';
import Home from './components/Home.vue';
import User from './components/User/User.vue';
import EditUser from './components/User/EditUser.vue';
import Course from './components/Course/Course.vue';
import EditCourse from './components/Course/EditCourse.vue';
import Section from './components/Section/Section.vue';
import EditSection from './components/Section/EditSection.vue';

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
    	name: 'user',
    	path: '/User', 
    	component: User 
    },
    {  
    	name: 'editUser',
    	path: '/editUser/:id', 
    	component: EditUser
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
