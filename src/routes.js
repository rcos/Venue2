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
import NewCourse from './components/Course/NewCourse.vue';
import Courses from './components/Course/Courses.vue'; 
import Sections from './components/Section/Sections.vue';
import EditSection from './components/Section/EditSection.vue';
import NewSection from './components/Section/NewSection.vue';
import NewUser from './components/User/NewUser.vue';
import NewEvent from './components/Event/NewEvent.vue';
import Events from './components/Event/Events.vue';
import EditEvent from './components/Event/EditEvent.vue';
import NewSubmission from './components/Submission/NewSubmission.vue';
import Submissions from './components/Submission/Submissions.vue';

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
        name: 'new_course',
        path: '/new_course',
        component: NewCourse
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
        name: 'sections',
        path: '/sections',
        component: Sections
    },
    {
        name: 'editSection',
        path: '/editSection/:id',
        component: EditSection
    },
    {
        name: 'new_section',
        path: '/new_section',
        component: NewSection
    },
    {
        name: 'new_event',
        path: '/new_event',
        component: NewEvent
    },   
    {
        name: 'events',
        path: '/events',
        component: Events
    },
    {
        name: 'edit_event',
        path: '/edit_event/:id',
        component: EditEvent
    },
    {
        name: 'new_submission',
        path: '/new_submission',
        component: NewSubmission
    },
    {
        name: 'submissions',
        path: '/submissions',
        component: Submissions
    }
];

export default routes;
