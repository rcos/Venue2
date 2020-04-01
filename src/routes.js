import Vue from 'vue'
import VueRouter from 'vue-router';
import Home from './components/Home.vue';
import Users from './components/admin/User/Users.vue';
import EditUser from './components/admin/User/EditUser.vue';
import Instructors from './components/admin/User/Instructors.vue';
import Students from './components/admin/User/Students.vue';
import Course from './components/admin/Course/Course.vue';
import EditCourse from './components/admin/Course/EditCourse.vue';
import NewCourse from './components/admin/Course/NewCourse.vue';
import Courses from './components/admin/Course/Courses.vue'; 
import Sections from './components/admin/Section/Sections.vue';
import EditSection from './components/admin/Section/EditSection.vue';
import NewSection from './components/admin/Section/NewSection.vue';
import NewUser from './components/admin/User/NewUser.vue';
import NewEvent from './components/admin/Event/NewEvent.vue';
import Events from './components/admin/Event/Events.vue';
import EditEvent from './components/admin/Event/EditEvent.vue';
import NewSubmission from './components/admin/Submission/NewSubmission.vue';
import Submissions from './components/admin/Submission/Submissions.vue';
import LandingPage from './views/LandingPage.vue';
import Signup from './components/Signup.vue';
import Dashboard from './views/Dashboard.vue';
import CourseList from './components/CourseList.vue';
import CourseInfo from './components/CourseInfo.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    { 
        name: 'landing_page',
    	path: '/', 
    	component: LandingPage,
        meta: { requiresNoLogin: true }
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
        component: NewEvent,
        meta: { 
          requiresAuth: true,
          requiresInstructor: true 
        }
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
    },
    {
        name: 'user_courses',
        path: '/user_courses',
        component: CourseList
    },
    {
        name: 'course_info',
        path: '/course_info/:id',
        component: CourseInfo
    }
  ]
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')

  if(to.matched.some(record => record.meta.requiresAuth)) {

    if(loggedIn) {

      if(to.matched.some(record => record.meta.requiresInstructor)) {

        const user_data = JSON.parse(loggedIn)
        if(user_data.current_user.is_instructor) {
          next()
        } else {
          next('/dashboard')
        }

      } else {
        next()
      }

    } else {
      next('/')
    }

  } else if(to.matched.some(record => record.meta.requiresNoLogin)) {

    if(loggedIn) {
      next('/dashboard')
    } else {
      next()
    }

  } else {
    next()
  }


  // if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
  //   next('/')
  // } else if(to.matched.some(record => record.meta.requiresNoLogin) && loggedIn) {
  //   next('/dashboard')
  // } else {
  //   next()
  // }
})

export default router
