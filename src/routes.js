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
import AdminSections from './components/admin/Section/AdminSections.vue';
import AdminEditSection from './components/admin/Section/AdminEditSection.vue';
import AdminNewSection from './components/admin/Section/AdminNewSection.vue';
import NewUser from './components/admin/User/NewUser.vue';
import AdminNewEvent from './components/admin/Event/AdminNewEvent.vue';
import AdminEvents from './components/admin/Event/AdminEvents.vue';
import AdminEditEvent from './components/admin/Event/AdminEditEvent.vue';
import NewSubmission from './components/admin/Submission/NewSubmission.vue';
import Submissions from './components/admin/Submission/Submissions.vue';
import LandingPage from './views/LandingPage.vue';
import Signup from './components/Signup.vue';
import Dashboard from './views/Dashboard.vue';
import CourseList from './components/CourseList.vue';
import CourseInfo from './views/CourseInfo.vue';
import NewEvent from './views/NewEvent.vue';
import EventInfo from './views/EventInfo.vue';
import WebexTest from './views/WebexTest.vue';
import NewLecture from './views/NewLecture.vue';

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
        name: 'admin_sections',
        path: '/admin/sections',
        component: AdminSections
    },
    {
        name: 'admin_edit_section',
        path: '/admin/edit_section/:id',
        component: AdminEditSection
    },
    {
        name: 'admin_new_section',
        path: '/admin/new_section',
        component: AdminNewSection
    },
    {
        name: 'admin_new_event',
        path: '/admin/new_event',
        component: AdminNewEvent,
        meta: { 
          requiresAuth: true,
          requiresInstructor: true 
        }
    },   
    {
        name: 'admin_events',
        path: '/admin/events',
        component: AdminEvents
    },
    {
        name: 'admin_edit_event',
        path: '/admin_edit_event/:id',
        component: AdminEditEvent
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
    },
    {
        name: 'new_event',
        path: '/new_event/:course_id',
        component: NewEvent,
        meta: { 
          requiresAuth: true,
          requiresInstructor: true 
        }
    },
    {
        name: 'event_info',
        path: '/event_info/:event_id',
        component: EventInfo,
        meta: { 
          requiresAuth: true,
        }
    },
    {
      name: 'webex_test',
      path: '/webex_test',
      component: WebexTest,
      meta: { 
        requiresAuth: true,
      }
    },
    {
        name: 'new_lecture',
        path: '/new_lecture/:course_id',
        component: NewLecture,
        meta: { 
          requiresAuth: true,
          requiresInstructor: true 
        }
    },
  ]
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')

  if (to.matched.some(record => record.meta.requiresAuth)) {

    if (loggedIn) {

      if (to.matched.some(record => record.meta.requiresInstructor)) {

        const user_data = JSON.parse(loggedIn)
        if (user_data.current_user.is_instructor) {
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

  } else if (to.matched.some(record => record.meta.requiresNoLogin)) {

    if (loggedIn) {
      next('/dashboard')
    } else {
      next()
    }

  } else {
    next()
  }
})

export default router
