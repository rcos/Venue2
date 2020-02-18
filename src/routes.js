import Vue from 'vue'
import VueRouter from 'vue-router';
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
import LandingPage from './views/LandingPage.vue';
import Signup from './components/Signup.vue';
import Dashboard from './views/Dashboard.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    { 
        name: 'landing_page',
    	path: '/', 
    	component: LandingPage
    },
    { 
    	path: '/Account', 
    	component: Account 
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
    },
    {
        name: 'signup',
        path: '/signup',
        component: Signup
    },
    {
        name: 'dashboard',
        path: '/dashboard',
        component: Dashboard,
        meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/')
  } else {
    next()
  }
})

export default router
